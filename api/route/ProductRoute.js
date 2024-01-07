const express = require('express');
const router=express.Router();
const Product=require('../Model/productSchema');
const mongoose=require('mongoose');
const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dxfeq2yxo', 
    api_key: '121886862575166', 
    api_secret: 'uTsFz0rv-QmOrni9YdQ8LC7KPSc' 
  });


router.get('/',(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            productData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.get('/:id',(req,res,next)=>{
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            productResult:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


router.post('/',(req,res,next)=>{
    const file=req.files.photo;
  
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        const product=new Product({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            costPrice:req.body.costPrice,
            imagePath:result.url
        })
        product.save()
        .then(result=>{
         res.status(200).json({
            newProduct:result
         })
        })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
    
    }
    )

})



router.delete('/',(req,res,next)=>{

    let imageUrl=req.query.imageUrl;
    let str=imageUrl.split('/')
    let image=str[str.length-1];
    const imageName=image.split('.')[0];

    
    const studentId=req.query.id;
    Product.deleteOne({_id:studentId})
    .then((Result)=>{
        cloudinary.uploader.destroy(imageName,(errors,results)=>{
            console.log(errors,results);
        })
        res.status(200).json({
            message:"Product Deleted",
            result:Result,
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
})


router.put('/:id',(req,res,next)=>{
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
              name:req.body.name,
              costPrice:req.body.costPrice,
              imagePath:req.body.imagePath
        }
    })
    .then((result)=>{
        res.status(200).json({
            updated_result:result
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
        })
    })
})








module.exports=router;




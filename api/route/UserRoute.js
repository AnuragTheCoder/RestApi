const express = require('express')
const router=express.Router();

const mongoose = require('mongoose')
const User=require('../Model/userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.get('/',(req,res,next)=>{
    User.find()
    .then((val)=>{
        res.status(200).json({
        UserData:val
        })
    })
    .catch((err)=>{
        res.status(500).json({
          error:err
        })
    })
})

router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id)
    .then((val)=>{
        res.status(200).json({
        UserData:val
        })
    })
    .catch((err)=>{
        res.status(500).json({
          error:err
        })
    })
})


router.post('/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password,10,(err,hash)=>{
     if(err){
        return res.status(500).json(({
            error:err
        }))
     }
     else{
        const user=new User({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            email:req.body.email,
            password:hash,
            gender:req.body.gender,
            phone:req.body.phone,
            userType:req.body.userType,
        })
        user.save()
        .then((result)=>{
            res.status(200).json({
                userData:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
     }
  })
})



router.post('/login',(req,res,next)=>{
    User.find({name:req.body.name})
    .exec()
    .then(username=>{   //username in arr if 1 user then length of array is 1
        if(username.length<1){
            return res.status(401).json({
                message:"User Does Not Exist"
            })
        }
        bcrypt.compare(req.body.password,username[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    message:"Password Matching Fail"
                })
            }
            else{
                //make a token and send it to user
                const token=jwt.sign({
                    name:username[0].name,
                    userType:username[0].userType,
                    email:username[0].email,
                    phone:username[0].phone,
                
                },'this is dummy text',{expiresIn:"24h"});
                  res.status(200).json({
                    name:username[0].name,
                    userType:username[0].userType,
                    email:username[0].email,
                    phone:username[0].phone,
                    token:token
                })
            
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})



router.delete('/:id',(req,res,next)=>{
    User.deleteOne({_id:req.params.id})
    .then((Res)=>{
        res.status(200).json({
            resultData:Res
        }) 
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
       })
})

router.put('/:id',(req,res,next)=>{
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            phone:req.body.phone,
            userType:req.body.userType,
        }
    })
    .then((Res)=>{
        res.status(200).json({
            resultData:Res
        }) 
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
       })

})

module.exports =router
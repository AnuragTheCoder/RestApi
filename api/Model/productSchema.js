const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:String,
    costPrice:Number,
    imagePath:String,

})
module.exports=mongoose.model('Product', productSchema);
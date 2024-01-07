const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    gender:String,
    phone:Number,
    userType:String,

})

module.exports=mongoose.model('User',userSchema);


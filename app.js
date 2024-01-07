const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');

// const cors=require('cors');
mongoose.connect("mongodb+srv://anurag:helloworld@cluster0.o8dbk4t.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on('connected',(connected)=>{
    console.log("connected database Successfully")
})
mongoose.connection.on('error',(error)=>{
    console.log("Connection Failed");
})
app.use(fileUpload({
    useTempFiles:true
}))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ProductRoute=require('./api/route/ProductRoute')
app.use('/product',ProductRoute);
const UserRoute=require('./api/route/UserRoute')
app.use('/user',UserRoute);
app.use((req,res,index)=>{
    res.status(404).json({
        msg:"Not so Invalid Response"
    })
})

module.exports=app;
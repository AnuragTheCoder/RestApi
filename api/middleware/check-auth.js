const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
    const token=req.headers.authorization.split(" ")[1] ;
    const verify=jwt.verify(token,'this is dummy text');
    if(verify.userType=='Admin'){
    next();
    }
    else{
        return res.status(400).json({
            msg:"Not Admin"
        })
    }
    }
    catch(err){
        res.status(401).json({
            message:"Invalid token"
        })
    }
}

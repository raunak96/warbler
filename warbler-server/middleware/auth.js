require('dotenv').config();  //not necessary as we have done dotenv.config in index.js,,,just for safety
const jwt=require("jsonwebtoken"); //TO DECODE TOKENS PASSED SO WE KNOW IF CORRECT USER LOGGED IN

//MAKE SURE USER IS LOGGED-AUTHENTICATION
exports.isLoggedIn=function(req,res,next){   //NOT ASYNC AS JWT DOESN'T RETURN PROMISES
    try{
        /*JWT TOKEN IS CONTAINED IN HTTP HEADERS and is of the form AUTHORISTION:BEARER <TOKEN>,we want TOKEN part hence we split {bearer <token>}
        with space and store token part */
        const token=req.headers.authorization.split(" ")[1];       
    
        jwt.verify(token,process.env.SECRET_KEY,function(err,payload){   //THE CURRENT TOKEN PASSED WITH SECRET KEY TO DECODE PAYLOAD WHICH DEPENDS ON USER INFO 
            if(payload)
                return next();
            else
                return next({status:401,message:"Please LogIn first!!"});
        })
    }
    catch(err){
        return next({status:401,message:"Please LogIn first!!"});
    }
}

//MAKE SURE WE GET CORRECT USER-AUTHORISATION 
exports.isCorrectUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];       
        jwt.verify(token,process.env.SECRET_KEY,function(err,payload){//THE CURRENT TOKEN PASSED WITH SECRET KEY TO DECODE PAYLOAD WHICH DEPENDS ON USER INFO 
            if(payload && payload.id===req.params.id) //PAYLOAD WAS OBJECT OF{id,username,profileImageURL}
                return next();
            else
                return next({status:401,message:"UnAuthorised!!"});
        })
    }
    catch(err){
        return next({status:401,message:"UnAuthorised!!"});
    }
}
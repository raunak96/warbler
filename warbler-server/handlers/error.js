function errorHandler(err,req,res,next){
    return res.status(err.status||500).json({        // NOW ERRORS ARE RETURNED AS JSON(IF 404 ERROR THEN OK,ELSE SOME OTHER ERROR THEN STATUS=500) 
        error:{
            message:err.message||"Oops something went Wrong!"
        }
    });
}
module.exports=errorHandler;
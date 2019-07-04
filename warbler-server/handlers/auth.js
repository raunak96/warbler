const User=require("../models").User;
const jwt=require("jsonwebtoken");  //USED TO MARK USERS AS LOGGED IN(SESSIONS);

exports.signUp=async function(req,res,next){
    try{
        //CREATE A USER
        let user=await User.create(req.body);
        let {id,username,profileImageUrl}=user;
        
        //CREATE/SIGNING A TOKEN(1ST PARAM CALLED PAYLOAD(IN OUT CASE PARAMS OF USER MODEL AS AN OBJ),2ND PARAM IS SECRET KEY)
        let token=jwt.sign({
            id,username,profileImageUrl    //SAME AS id:id,username:username
        },process.env.SECRET_KEY);
        return res.status(200).json({
            id,username,profileImageUrl,token
        });
    }catch(err){
        if(err.code===11000){    //11000 IS ERROR CODE FOR VALIDATION FAIL
            err.message="Sorry!the Username and/or email is already taken";
        }
        return next({
            status:400,message:err.message
        });  //THIS WILL PASS ON TO ERRORHANDLER WITH THIS OBJ AS PARAM
    }
}
exports.signIn=async function(req,res,next){
    try{
        console.log(req.body.email);
        let user=await User.findOne({email:req.body.email});
        let{id,username,profileImageUrl}=user;
        
        let isMatch=await user.comparePassword(req.body.password);  //SEE IF PASSWORD MATCHES(this method defined in userSchema)
        if(isMatch)
        {
            let token=jwt.sign({id,username,profileImageUrl},process.env.SECRET_KEY);
            return res.status(200).json({id,username,profileImageUrl,token});
        }
        else{
            return next({status:400,message:"Invalid Email/Password"});
        }
    }
    catch(err){
        return next({status:400,message:"Invalid Email/Password"});
    }
}
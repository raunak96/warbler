const db=require("../models");

//path like /api/users/:id/messages
exports.createMessage=async function(req,res,next){
    try{
        let message=await db.Message.create({
            text : req.body.text,
            user:req.params.id
        });
        let foundUser=await db.User.findById(req.params.id);
        foundUser.messages.push(message._id);
        await foundUser.save();                                                 
        let foundMessage=await db.Message.findById(message._id) //THIS FOUNDMESSAGE WILL POPULATE ITS USER PROPERTY SO THAT APART FROM USER ID,IT ALSO
        .populate("user",{username:true,profileImageUrl:true}); //CONTAINS USERNAME AND PROFILEPIC SO THAT FOR EACH MESSAGE WE HAVE ASSOCIATED USERNAME AND PIC 
        return res.status(200).json(foundMessage);
    }
    catch(err){
        return next(err);
    }
}
//path like /api/users/:id/messages/:message_id
exports.getMessage=async function(req,res,next){
    try{
        let message=await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);
    }
    catch(err){return next(err);}
}
exports.updateMessage=async function(req,res,next){
    try{
        let message=await db.Message.findByIdAndUpdate(req.params.message_id,req.body,{new:true});
        return res.status(200).json(message);
    }
    catch(err){
        return next(err);
    }
}

exports.deleteMessage=async function(req,res,next){
    try{
        let message=await db.Message.findById(req.params.message_id);
        await message.remove();     //WE CANT USE findByIdAndRemove AS IN MESSAGE MODEL THERE IS A HOOK ON REMOVE METHOD(IT DOESNT EXIST FOR findByIdAndRemove)  
        return res.status(200).json(message);
    }
    catch(err){return next(err);}
}
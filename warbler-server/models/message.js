const mongoose=require("mongoose");
const User=require("./user");

const messageSchema=new mongoose.Schema({
        text:{
            type:String,
            required:true,
            maxLength:200,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,    //USER IS REPRESENTED BY ITS ID
            ref:'User'                              //REFERENCE USER model i.e user is User type model
        }
    },
    {
        timestamps:true       //auto assigns updated_at created_at property
    }
)

messageSchema.pre("remove",async function(next){     //BEFORE REMOVING MESSAGE RUN THIS
    try{
        let user=await User.findById(this.user);   //THIS REFERS TO USER OF MESSAGE SCHEMA THAT INVOKED REMOVAL OF ITSELF,
        user.messages.remove(this._id);                                            //SINCE USER OF MESSAGE IS MADE OF ITS ID WE SIMPLY PASS IT TO BE SEARCHED BY ID
        await user.save();
        return next();
    }
    catch(err)
    {
        return next(err);
    }
})

module.exports=mongoose.model('Message',messageSchema);
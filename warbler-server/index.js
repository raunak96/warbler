require("dotenv").config(); //LOADS ALL .env variables
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes=require("./routes/auth");
const messageRoutes=require("./routes/messages");
const {isLoggedIn,isCorrectUser}=require("./middleware/auth");
const db=require("./models");
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);   //IF ANY REQUEST STARTS WITH /api/auth go to authRoutes 

app.use("/api/users/:id/messages",isLoggedIn,isCorrectUser,messageRoutes); //MIDDLEWARE TO ALLOW ONLY LOGGEDIN USERS AND AUTHORISED TO GO TO MESSAGES

//DISPLAY ALL MESSAGES IN DESCENDING ORDER OF CREATION TIME(GOT FROM TIMESTAMPS MONGOOSE PROPERTY AT MESSAGE MODEL)
app.get("/api/messages",isLoggedIn,async function(req,res,next){
    try{
        let messages=await db.Message.find().sort({createdAt:"desc"}).populate("user",{username:true,profileImageUrl:true});
        return res.status(200).json(messages);
    }
    catch(err){
        return next(err);
    }
})


//----ERROR HANDLER----------------------------------------------------------------------------------------
//IF NONE OF THE ROUTES MATCH,THAT MEANS PROB WITH REQUEST,THERFORE GO TO ERROR HANDLER BELOW
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);
//-----------------------------------------------------------------------------------------------------------

app.listen(process.env.PORT, function() {
  console.log(`Server is starting on port ${process.env.PORT}`);
});

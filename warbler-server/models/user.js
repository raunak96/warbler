const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  //LIBRARY TO (ONE-WAY-HASH)HASH PASSWORDS SUCH THAT PASSWORD REMAINS SECRET

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  messages:[{
    type:mongoose.Schema.Types.ObjectId,   //each message in array refers to unique message by its id 
    ref:"Message"
  }],
  profileImageUrl: {
    type: String
  }
});
//RIGHT BEFORE THIS DOC IS SAVED(PRE),WE RUN A FUNCTION WHICH HASHES OUR PASSOWRD IN THIS CASE AS PWD HAS TO BE HASHED,BCRYPT.HASH IS ASYNC
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();   //IF PWD HAS NOT BEEN MODIFIED,NO NEED TO HASH IT AGAIN,SIMPLY SAVE(MOVE TO NEXT PIECE OF MIDDLEWARE),return next bypasses rest of func unlike only next
    }
    let hashedPassword = await bcrypt.hash(this.password, 10); //10 is salt used toadd more randomness to hash
    this.password = hashedPassword;  //NOW PWD IS THE HASHED VERSION
    return next();
  } catch (err) {
    return next(err);
  }
});
//EVERY MODEL FROM THIS SCHEMA WILL HAVE THIS INSTANCE METHOD USED TO MATCH PASSWORDS
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);   //HASHES CANDIDATEPWD,THEN MATCHES THAT WITH DB PWD RETURNS BOOLEAN
    return isMatch;
  } catch (err) {
    return next(err);//go to error handler
  }
};
const User = mongoose.model("User", userSchema);

module.exports = User;

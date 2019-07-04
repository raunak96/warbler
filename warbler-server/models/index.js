var mongoose = require('mongoose');
mongoose.set('debug', true); //shows mongoose queries as db func used
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warbler', { useNewUrlParser: true });

mongoose.Promise = Promise; //to use async func like .then .catch which return promises

module.exports.User = require("./user");
module.exports.Message=require("./message");
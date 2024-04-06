// models/User.js

const mongoose = require('mongoose');
const {userDetails} = require ('../config/mongoose.js')

const userSchema = new mongoose.Schema({
  Name: String ,
  UserIDs: Number, 
  SecretKey: String, 
  Gender: String
});

const user = userDetails.model('UserIDs', userSchema);

module.exports = {
  user
};

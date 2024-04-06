// models/Connection.js

// const mongoose = require('mongoose');
const {userDetails} = require ('../config/mongoose.js')

const connectionSchema = {
  FromUser: String ,
  FromID: String ,
  ToUser: String ,
  ToID: String, 
  Connection: String 
};

const connection = userDetails.model('Connections', connectionSchema);
// console.log(Connection);

module.exports = { 
  connection
};

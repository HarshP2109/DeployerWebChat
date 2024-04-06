// config/mongoose.js
const mongoose = require('mongoose');
require('dotenv').config();

const MongoURL1 = process.env.MongoURL1;
const MongoURL2 = process.env.MongoURL2;

// Create connection to MongoDB databases
const userDetails = mongoose.createConnection(MongoURL1);
const chat = mongoose.createConnection(MongoURL2);

module.exports = {
  userDetails,
  chat
};

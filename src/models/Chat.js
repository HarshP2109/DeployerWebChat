// models/Chat.js

const mongoose = require('mongoose');
const {chat} = require ('../config/mongoose.js')

const chatSchema = new mongoose.Schema({
  FromUser: String,
  FromID: String,
  ToUser: String,
  ToID: String,
  Message: String,
  Time: String
});

const chatData = chat.model('Chat', chatSchema);

module.exports = {
  chatData
};

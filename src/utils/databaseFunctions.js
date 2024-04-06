
const { getGender } =  require('gender-detection-from-name');
// const mongoose = require ('mongoose');
const { connection } = require ('../models/Connection.js');
const { chatData } = require ('../models/Chat.js');
const { user } = require ('../models/User.js');
const { chat } = require ('../config/mongoose.js');
const { checkSame, sorter } = require ('./basicFunctions.js')

const insertId = (name, userId, secretKey) => {
    let gender = getGender(name, 'en');
    let finalGender;
    if(gender=="female")
      finalGender = "girlunknown";
    else
      finalGender = "unknown";

    let data = new user({ Name: name, UserIDs: userId,  SecretKey: secretKey, Gender: finalGender});
    data.save().then(() => console.log("Values Inserted!!!"));
}

const findFriend = async(friendId) => {
    let person = await user.find({"SecretKey":friendId}, 'Name');
    if(person.length==0)
      return 0;
    else
      return person[0].Name;
}

const checkConnection = async(fromId,toId) => {
    let query = {
        $or: [
          { 'Connection': { $regex: `^${fromId}:${toId}` } },
          { 'Connection': { $regex: `^${toId}:${fromId}` } }
        ]
      }; 
    let person = await connection.find(query, '');
    return person.length;
}

 async function findConnection(fromId){
    let query = {
        $or: [
          { 'Connection': { $regex: `^${fromId}:` } },
          { 'Connection': { $regex: `:${fromId}` } }
        ]
      }; 
    let connections = [];  
    let friend = await connection.find(query);
    for(let i=0;i<friend.length;i++){
        let key;
        let data;
        // console.log(friend[i]);
        if(friend[i].FromID === fromId){
          key=friend[i].ToID;

          if(key === "HP212003")
          continue;

          let person = await user.find({"SecretKey":key}, 'Gender');
          // console.log(person);

          data = {
            "Name" : friend[i].ToUser,
            "ID" : key,
            "Gender": person[0].Gender
          }
        }else{
          key=friend[i].FromID;
          
          if(key === "HP212003")
          continue;

          let person = await user.find({"SecretKey":key}, 'Gender');
          console.log(key);

          data = {
            "Name" : friend[i].FromUser,
            "ID" : key,
            "Gender": person[0].Gender
          }
        }
  
        connections.push(data);
      }

    return connections;  
}

const addConnection = async(fromId,toId) => {
    let fromName = await findFriend(fromId);
    let connect = sorter(fromId,toId);

    let same = checkSame(fromId,toId);

    if(same==0){
        let receiverName = await findFriend(toId);
        if(receiverName!=0){
            let data = new connection({
                FromUser: fromName, FromID: fromId, ToUser: receiverName, ToID: toId, Connection: connect
            });

            let check = await checkConnection(fromId,toId);

            if(check==0)
            data.save().then(() => console.log('Connection Data Inserted!!!'));

        }
    }
}

const addDeveloper = async(name,toId) => {
    // let from_name = await findFriend(from_id);
    let fromId = process.env.AdminID;
    let connect = sorter(fromId,toId);

    let data = new connection({
        FromUser: "Harsh Pimpale" , FromID: fromId, ToUser: name, ToID: toId, Connection: connect
    });

    data.save().then(() => console.log('Connection to Developer Inserted!!!'));
}

const sendChat = async(fromName,receiverName,fromId,toId,message,time) => {
    
    let tmp = sorter(fromId,toId);
    let ChatModel = chat.model(tmp, chatData.schema);
    let NewChat = new ChatModel({ FromUser:fromName, FromID:fromId, ToUser:receiverName, ToID:toId, Message: message, Time:time });
    NewChat.save().then(() => console.log(' Messageee Sentt!!!'));
}

const searchChat = async(fromId,toId) => {
    
    let tmp = sorter(fromId,toId);
    let NewChat = chat.model(tmp, chatData.schema);
    let response = NewChat.find({});
    return response;
}

module.exports = {
    insertId,
    findFriend,
    findConnection,
    addConnection,
    addDeveloper,
    sendChat,
    searchChat
}
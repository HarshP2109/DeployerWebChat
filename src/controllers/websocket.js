// websocket.js

const { insertId, addConnection, addDeveloper, sendChat, searchChat } = require ('../utils/databaseFunctions')
const { arrayRemove, socketWorker} = require ('../utils/basicFunctions')

// Create a WebSocket server

var idNames = [];     //IDS with their socketiD
var idActive = [];        //Ids Active

// Handle WebSocket connections

function registerEvents(io){

    io.on('connection', (socket) => {

        socket.on('makeid', (name,userID,secret) => {
            console.log(name+" "+userID+" "+secret);
            insertId(name,userID,secret);
            addDeveloper(name,secret);
        });
        
        socket.on('Online I', (user, id) => {
            let active = {
              "Name": user,
              "ID": id,
              "Socket":socket.id
            }
            idNames.push(active);
            idActive.push(id);
        });
        
        
        socket.on('Add_Connection', (fromid, toid) => {
        // console.log("From : "+fromid+" , To : "+toid);
        addConnection(fromid,toid);
        });
        
        
        socket.on("private message",(from,to,fromid,toid,message,time) => {
    
            if(toid==="Back End Developer"){
                toid = "HP212003"
            }
    
            sendChat(from,to,fromid,toid,message,time);
    
            let data ={
            "From" : from,
            "Message" : message,
            "Time" : time
            };
    
            let work = "curr text";
            socketWorker(work,toid,data)
        });
        
        socket.on("get chat",(fromid,toid) => {
        
            if(toid==="Back End Developer"){
                toid = "HP212003"
            }
            searchChat(fromid,toid).then( data => {
            // let data = formater_chat(abcd);
                console.log("Chat data :"+data.length);
                let chatList = [];
                for(let i=0;i<data.length;i++){
                    let fromId = data[i].FromID;
                    let message = data[i].Message;
                    let time = data[i].Time;
                    let singledata = {
                        "From" : fromId,
                        "Message" : message,
                        "Time" : time
                    }
                
                    // console.log(ab); 
                    chatList.push(singledata);
                }
                io.emit("send text",chatList);
                
            });
        });
        
        
        socket.on('disconnect', () => {
            console.log("Disconnecttttt :"+socket.id);
            for (let i = 0; i < idNames.length; i++) {
                if((idNames[i]["Socket"] == socket.id)){
                    let idDisconnect = idNames[i].ID; 
                    if(idActive.includes(idDisconnect))
                        arrayRemove(idActive,idDisconnect);
                        idNames.splice(i,1);
                    break;
                }
            }
        });
    
    });

}


module.exports = registerEvents
const dotenv = require ("dotenv");
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require("body-parser");
const ServerKey = process.env.ServerKey || 3000;
dotenv.config({
    path: "./config/.env",
});

const registerEventFunctions = require('./controllers/websocket')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes import
const route = require("./routes/route");

//route use
app.use("/", route);

const io = new Server(server);
// console.log(io);
registerEventFunctions(io);



// export default app;
server.listen(ServerKey,()=>{
    console.log("Server at port ",ServerKey," !!!");
    // registerEventFunctions();
  }); 

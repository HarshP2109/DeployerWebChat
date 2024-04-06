// const dotenv = require ("dotenv");
// require('dotenv').config()

const ServerKey = process.env.ServerKey || 3000;
console.log(ServerKey);

module.export = {
    ServerKey
}
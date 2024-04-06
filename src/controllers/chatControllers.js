// controllers/chatController.js
const { findConnection } = require('../utils/databaseFunctions')
const customId = require("custom-id");

const redirectMain = (req, res) => {
  res.redirect('/chat');
}

const accountCreationGet = (req, res) => {
  let uniqueId = customId({
    randomLength: 2
  });
  // io.emit('Custom-key',uniqueID) ;
  res.render('pages/startpage',{
    Unique : uniqueId 
  });
}

const userLogin = async(req,res) => {

  let name = req.params.harsh;
  let id = req.params.id;

  if((name=="")||(id==""))
  res.redirect('/chat');

  findConnection(id).then(friend => {
    console.log(friend);
        res.render('pages/index', {
            NAME : friend,
            naam: name,
            check: id
        } );
  })   
}

module.exports = {
  redirectMain,
  accountCreationGet,
  userLogin
}

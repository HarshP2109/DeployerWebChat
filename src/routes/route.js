// routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers');
// Define routes for chat functionality
router.get('/',chatController.redirectMain)
router.get('/chat', chatController.accountCreationGet);
router.get('/chat/:id/:harsh', chatController.userLogin);
// Define other chat routes...

module.exports = router;

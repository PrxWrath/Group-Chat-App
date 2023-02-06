const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats');
const userAuth = require('../middleware/auth');

router.get('/', chatsController.getChats);
router.post('/send-chat', userAuth.authenticate, chatsController.postAddChat);

module.exports = router;
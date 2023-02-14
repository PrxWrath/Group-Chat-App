const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats');
const userAuth = require('../middleware/auth');

router.post('/get-chats', chatsController.getChats);
router.post('/send-chat', userAuth.authenticate, chatsController.postAddChat);
router.post('/create-group', userAuth.authenticate, chatsController.postCreateGroup);
router.get('/groups', userAuth.authenticate, chatsController.getUserGroups);
router.post('/group-info', chatsController.getGroupInfo);
router.post('/send-file', userAuth.authenticate, chatsController.postSendFile);
router.post('/delete-chat', chatsController.postDeleteChat);
module.exports = router;
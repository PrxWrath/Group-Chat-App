const express = require('express');
const router = express.Router();
const invitesController = require('../controllers/invites');
const userAuth = require('../middleware/auth');

router.get('/', userAuth.authenticate, invitesController.getInvites);
router.post('/send-invite', userAuth.authenticate, invitesController.sendInvite);
router.post('/accept-invite', userAuth.authenticate, invitesController.acceptInvite);
router.post('/reject-invite', invitesController.rejectInvite)


module.exports = router;

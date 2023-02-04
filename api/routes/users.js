const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userAuth = require('../middleware/auth');

router.post('/user-signup', userController.postAddUser);
router.post('/user-login', userController.postFindUser);
router.post('/forgot-password', userController.postForgotPassword);
router.get('/reset-password/:reset_id', userController.getResetPassword);
router.post('/reset-password', userController.postResetPassword);
router.get('/active-users', userController.getActiveUsers);
router.post('/user-logout', userAuth.authenticate, userController.postRemoveActiveUser)
module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/user-signup', userController.postAddUser);

module.exports = router;
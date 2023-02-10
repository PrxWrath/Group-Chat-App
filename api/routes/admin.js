const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/make-admin',  adminController.postMakeAdmin);
router.post('/remove',  adminController.postRemoveMember);

module.exports = router;

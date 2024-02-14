const userCtrl = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

module.exports = router;
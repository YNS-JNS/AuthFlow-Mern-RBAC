const { auth } = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/sign-up', auth.signUp);
router.post('/sign-in', auth.signIn);

module.exports = router;
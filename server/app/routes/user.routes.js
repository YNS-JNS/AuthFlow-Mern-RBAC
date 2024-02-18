const { authController } = require('../controllers/auth.controller');
// const { authJwt, verifySignUp } = require("../middlewares/auth")
const { verifySignUp } = require('../middlewares/auth/verifySignUp')
const express = require('express');
const router = express.Router();

/** 
 * @des Sign Up:
 */
router.post('/sign-up', verifySignUp.checkDuplicateEmail, authController.signUp);

/** 
 * @des Sign In:
 */
router.post('/sign-in', authController.signIn);

module.exports = router;
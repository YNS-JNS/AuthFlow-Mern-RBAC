const express = require('express');
const router = express.Router();
const { allAccess, userBoard, adminBoard, moderatorBoard } = require('../controllers/user.controller');
const { authJwt } = require('../middlewares/auth/authJwt')

/** 
 * @des All Access:
*/
router.get('/all-access', allAccess);

/** 
 * @des  Access User:
*/
router.get('/access-user', userBoard);

/** 
 * @des  Access Admin:
*/
router.get('/access-admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard);

/** 
 * @des  Access Moderator:
*/
router.get('/access-moderator', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);

module.exports = router;
const express = require('express');
const router = express.Router();
const { allAccess, userBoard, adminBoard, moderatorBoard, allUsers } = require('../controllers/user.controller');
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

/** 
 * @des  Access users:
*/
router.get('/all-users/:id', [authJwt.verifyToken, authJwt.isAdminOrIsModerator], allUsers);

module.exports = router;
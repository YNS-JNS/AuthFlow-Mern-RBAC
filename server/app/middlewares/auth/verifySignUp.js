const db = require('../../models');
const UserModel = db.user;
const ROLES = db.ROLES;

/**
 * @NB exec() function in mongoose
 * @URL : https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
*/

/**
 * @desc To verify a Signup action, we need 2 functions:
    – check duplications for username and email 'checkDuplicateUsernameOrEmail'
    – check if roles in the request is legal or not 'checkRolesExisted'
*/

exports.verifySignUp = {

    checkDuplicateEmail: async (req, res, next) => {

        try {
            // check email:
            const existsUser = await UserModel.findOne({ email: req.body.email }).exec();

            if (existsUser) {
                res.status(409).json({ message: "Failed! Email is already in use!", email: existsUser.email })
                return;
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "Error checking email!", error: error.message });
        }

    },

    checkRolesExisted: (req, res, next) => {

        // check if the user role exists in the database (among : [user, admin, moderator])
        if (req.body.role) {

            if (!ROLES.includes(req.body.role)) {

                res.status(400).json({ message: `Failed! Role ${req.body.role} does not exist!` })
                return;
            }

        }

        next();
    }
};
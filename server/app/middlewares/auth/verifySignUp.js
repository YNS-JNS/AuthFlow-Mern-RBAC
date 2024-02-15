const db = require('../../models');
const UserModel = db.user;
const ROLES = db.role;

/**
 * @NB exec() function in mongoose
 * @URL : https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
*/

/**
 * @desc To verify a Signup action, we need 2 functions:
    – check duplications for username and email 'checkDuplicateUsernameOrEmail'
    – check if roles in the request is legal or not 'checkRolesExisted'
*/

export const verifySignUp = {

    checkDuplicateUsernameOrEmail: (req, res, next) => {

        // TODO: check if firstName and email are already exists in database
        // check firstName:
        UserModel.findOne({ firstName: req.body.firstName })
            .exec((err, user) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }

                if (user) {
                    res.status(400).json({ message: "Failed! Username is already in use!" })
                    return;
                }

            });

        // check email:
        UserModel.findOne({ email: req.body.email })
            .exec((err, user) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }

                if (user) {
                    res.status(400).json({ message: "Failed! Email is already in use!" })
                    return;
                }
            });

        next();
    },

    checkRolesExisted: (req, res, next) => {

        const { roles } = req.body;
        // check if the user role exists in the database
        if (roles) {

            for (let i = 0; i < roles.length; i++) {

                if (!ROLES.includes(roles[i])) {

                    res.status(400).json({ message: `Failed! Role ${roles[i]} does not exist!` })
                    return;
                }
            }
        }

        next();
    }
};

/*
we can use then() and catch() instead of using exec():
const verifySignUp = {
    checkDuplicateUsernameOrEmail: (req, res, next) => {
        Check if firstName and email are already exists in database
        Check firstName:
        UserModel.findOne({ firstName: req.body.firstName })
            .then((user) => {
                if (user) {
                    res.status(400).json({ message: "Failed! Username is already in use!" });
                    return;
                }
                Check email:
                return UserModel.findOne({ email: req.body.email });
            })
            .then((user) => {
                if (user) {
                    res.status(400).json({ message: "Failed! Email is already in use!" });
                    return;
                }
                next();
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
};
*/
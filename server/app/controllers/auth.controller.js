const db = require("../models");
const UserModel = db.user;
const RoleModel = db.role;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * TODO: Controller for Authentication
 * There are 2 main functions for Authentication:
    - sign up: create new User in database (role is user if not specifying role)
    - sign in:
    find username of the request in database, if it exists
    compare password with password in database using bcrypt, if it is correct
    generate a token using jsonwebtoken
    return user information & access Token
*/

/**
 * TODO: Controller methods for user authentication.
 * @namespace auth
*/
exports.authController = {

    /**
       * TODO: SignUp => Register a new user.
       * @function
       * @async
       * @memberof auth
       * @param {Object} req - Express request object.
       * @param {Object} res - Express response object.
       * @returns {Promise<void>} - A Promise that resolves after processing.
    */
    signUp: async (req, res) => {

        const { firstName, lastName, email, password, role } = req.body;

        try {

            // validation
            if (!firstName || !lastName || !email || !password) {
                res.status(400).json({
                    status: 400,
                    message: 'Please provide all fields!'
                })
                return;
            }

            let roleId;

            // checking role existing
            if (!role) {
                const getDefaultRole = await RoleModel.findOne({ name: "user" }).exec();

                if (!getDefaultRole) {
                    return res.status(404).json({ message: "Failed! getting role by default!" })
                }

                roleId = getDefaultRole.id;

            } else {
                const roleSelected = await RoleModel.findOne({ name: role }).exec();

                if (!roleSelected) {
                    return res.status(404).json({ message: `Failed! Role ${roleSelected} does not exist!` })
                }

                roleId = roleSelected.id;
            }

            // Create new user
            const newUser = new UserModel({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 8),
                role: roleId
            });

            let savedUser = await newUser.save();

            // Generate token
            const token = generateToken({
                sub: savedUser.id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role
            });

            // Send response
            res.status(201).json({
                status: 201,
                message: "User created successfully.",
                InfoUser: savedUser,
                accessToken: token
            });

        } catch (error) {
            res.status(500).json({ message: "Error creating user!", error: error.message });
        }

    },

    /**
           * TODO: Sign In an existing user.
           * @function
           * @async
           * @memberof auth
           * @param {Object} req - Express request object.
           * @param {Object} res - Express response object.
           * @returns {Promise<void>} - A Promise that resolves after processing.
    */
    signIn: async (req, res) => {

        const { email, password } = req.body;

        try {

            // validation
            if (!email || !password) {
                res.status(400).json({
                    status: 400,
                    message: 'Please provide all fields!'
                })
                return;
            }

            const user = await UserModel.findOne({ email }).populate("role", "name -_id").exec();

            // if user not found
            if (!user) {
                res.status(401).json({
                    status: 401,
                    message: 'Unauthorized!'
                })
                return;
            }

            // Check if the user's password is correct
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                res.status(401).json({
                    status: 401,
                    message: 'Email or password is invalid!' // "Unauthorized!"
                })
                return;
            }

            // generate token
            const token = generateToken({
                sub: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            });

            var authorities = "";

            authorities = "ROLE_" + user.role.name.toUpperCase();

            res.status(200).json(
                {
                    status: 200,
                    message: 'User authenticated successfully!',
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: authorities,
                    accessToken: token
                }
            );

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Error logging user!",
                error: err.message
            })
        }
    },
};

/**
     * TODO: Generate a JSON Web Token (JWT) for authentication.
     * @function
     * @param {Object} payload - Payload to be included in the token.
     * @returns {string} - The generated JWT.
*/
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};
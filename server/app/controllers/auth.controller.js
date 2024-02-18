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
     * TODO: Generate a JSON Web Token (JWT) for authentication.
     * @function
     * @param {Object} payload - Payload to be included in the token.
     * @returns {string} - The generated JWT.
*/
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

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
                roleId = role;
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
                message: "User created successfully.",
                data: savedUser,
                token: token
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
    signIn: (req, res) => {

        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            res.status(400).json({
                status: 400,
                message: 'Please provide all fields!'
            })
            return;
        }

        UserModel.findOne({ email }).populate("role", "name -_id")
            .then(
                (user) => {

                    // If the user is not existing 
                    if (!user) {
                        res.status(404).json({
                            status: 404,
                            message: 'User not found!'
                        })
                        return;
                    }

                    // Check if the user's password is correct
                    const isPasswordValid = bcrypt.compareSync(password, user.password);

                    // if not
                    if (!isPasswordValid) {
                        res.status(401).json({
                            status: 401,
                            message: 'Email or password is invalid!'
                        })
                        return;
                    }

                    // if correct, create a new token
                    // generate token
                    const token = generateToken({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    });

                    var authorities = "";

                    // authorities.push("ROLE_" + user.role.name.toUpperCase());
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
                    )

                }
            )
            .catch(
                (err) => {
                    res.status(500).json({
                        status: 500,
                        message: "Error checking user existence.",
                        error: err.message
                    })
                }
            );
    },
};
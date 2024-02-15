const db = require("../models");
const UserModel = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
exports.auth = {

    /**
       * TODO: SignUp => Register a new user.
       * @function
       * @async
       * @memberof auth
       * @param {Object} req - Express request object.
       * @param {Object} res - Express response object.
       * @returns {Promise<void>} - A Promise that resolves after processing.
    */
    signUp: (req, res) => {

        const { email } = req.body;

        UserModel.findOne({ email: email })
            .then(
                (user) => {
                    if (user) {
                        return res.status(409).json({
                            status: 409,
                            message: 'User already exists!'
                        })
                    } else {

                        const saltRounds = 10;
                        // hashing passwords
                        const newUser = new UserModel(
                            {
                                ...req.body,
                                password: bcrypt.hashSync(req.body.password, saltRounds)
                            }
                        );

                        // saving the new user in the database
                        newUser.save()
                            .then(
                                (user) => {

                                    // generate token
                                    const token = generateToken({
                                        id: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName
                                    });

                                    res.status(201).json({
                                        status: 201,
                                        message: 'User created successfully!',
                                        token
                                    })
                                }
                            )
                            .catch(
                                (err) => {
                                    res.status(400).json({
                                        status: 400,
                                        message: "Some error occurred while creating the user",
                                        error: err.message
                                    })
                                }
                            )
                    }
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

        UserModel.findOne({ email })
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
                        lastName: user.lastName
                    });

                    res.status(200).json(
                        {
                            status: 200,
                            message: 'User authenticated successfully!',
                            token
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
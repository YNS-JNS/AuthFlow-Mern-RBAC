const jwt = require("jsonwebtoken");
const db = require("../../models")
const UserModel = db.user;
const RoleModel = db.role;

exports.authJwt = {

    // jwtAccessAuthCheck
    verifyToken: (req, res, next) => {

        // Extract the token from the Authorization header
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            // 403: forbidden
            return res.status(403).json({ message: "No token provided!" });
        }

        // Verify the token asynchronously
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // err
            if (err) {
                return res.status(401).json({ message: "Unauthorized!" });
            }

            // decoded undefined
            // Attach the user information or id from the token to the request object
            req.userId = decoded.id;
            // req.userId = decoded;
        });

        // Log the user information or id
        console.log("User information or id:", req.userId);

        next();

    },
    /*
        const jwt = require("jsonwebtoken");
        exports.authMiddleware = (req, res, next) => {
            try {
                Extract the token from the Authorization header
                const token = req.headers?.authorization?.split(" ")[1];

                Check if the token is missing or invalid
                if (!token) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                Verify the token using the secret key
                const verifiedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

                Attach the user information from the token to the request object
                req.user = verifiedToken;

                Log the user information
                console.log("User information:", req.user);

                Continue to the next middleware or route handler
                next();
            } catch (error) {
                Handle token verification errors
                return res.status(401).json({ message: "Unauthorized", error: error.message });
            }
        };
    */

    isAdmin: (req, res, next) => {

        // using exec()
        UserModel.findById(req.userId)
            .exec(
                (err, user) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    // Check user role
                    RoleModel.find({ id: { $in: user.roles } })
                        .exec(
                            (err, roles) => {
                                if (err) {
                                    return res.status(500).json({ error: err.message });
                                }

                                // Loop through roles for searching for admin role
                                for (let i = 0; i < roles.length; i++) {

                                    if (roles[i].name === 'admin') {
                                        next();
                                        return;
                                    }
                                }

                                return res.status(401).json({ message: "Require Admin Role!" });
                            }
                        );
                }
            );

    },

    isModerator: (req, res, next) => {

        // using then() catch()
        UserModel.findById(req.userId)
            .then(
                (user) => {

                    // Checking role
                    RoleModel.find({ id: { $in: user.roles } })
                        .then(
                            (roles) => {
                                for (let i = 0; i < roles.length; i++) {

                                    // If user has moderator role, allow the request and move to the next middleware
                                    if (roles[i].role === "moderator") {
                                        next(); // Move to the next middleware
                                        return;
                                    }
                                }
                            }
                        )
                        .catch(err => res.status().json({ message: "Require Moderator Role!" || err.message }));
                }
            )
            .catch(err => res.status().json({ message: err.message }));

    }
};

/**
 * @desc $in:
 * The $in operator selects the documents where the value of a field equals any value in the specified array.
 * Syntax:
 * To specify an $in expression, use the following prototype:
 * { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
 * If the field holds an array, then the $in operator selects the documents whose field holds an array that contains 
 * at least one element that matches a value in the specified array (for example, <value1>, <value2>, and so on).
 * 
 * Example:
 * Let's say we have a collection of books with a "genre" field. We want to find all books that belong to either the "fiction" or "mystery" genre.
 * Here's how we can use the $in operator:
 * db.books.find({ genre: { $in: ["fiction", "mystery"] } })
 * This query will return all documents where the "genre" field is either "fiction" or "mystery".
 * 
 * For more details, see the documentation @URL : https://www.mongodb.com/docs/manual/reference/operator/query/in/
 */
const jwt = require("jsonwebtoken");
const db = require("../../models")
const UserModel = db.user;
const RoleModel = db.role;

exports.authJwt = {

    // jwtAccessAuthCheck
    verifyToken: (req, res, next) => {

        try {
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
                req.userId = decoded.sub;
                // req.userId = decoded;
                console.log("Sub id: ", req.userId);
            });

            // console.log("User information or id:", req.userId);

            next();
        } catch (error) {
            console.log("Error:", error);
        }

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

    isAdmin: async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.userId).exec();

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            console.log("isAdmin: " + user);

            const roleUser = await RoleModel.findOne({ _id: user.role }).exec();

            if (!roleUser) {
                return res.status(404).json({ error: "Role not found" });
            }

            console.log("Role: " + roleUser);

            if (roleUser.name === 'admin') {
                next();
            } else {
                return res.status(403).json({ error: "You are not authorized to access this resource" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    isModerator: async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.userId).exec();

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            console.log("isAdmin: " + user);

            const roleUser = await RoleModel.findOne({ _id: user.role }).exec();

            if (!roleUser) {
                return res.status(404).json({ error: "Role not found" });
            }

            console.log("Role: " + roleUser);

            if (roleUser.name === 'moderator') {
                next();
            } else {
                return res.status(403).json({ error: "You are not authorized to access this resource" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
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
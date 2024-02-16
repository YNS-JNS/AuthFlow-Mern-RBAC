const jwt = require("jsonwebtoken");
const db = require("../../models")
const UserModel = db.user;
const RoleModel = db.role;

export const authJwt = {

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

        UserModel.findById(req.userId)
            .exec(
                (err, user) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    // Check user role
                    RoleModel.find({ id: { $in: req.user.roles } })
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

        next();
    }
};
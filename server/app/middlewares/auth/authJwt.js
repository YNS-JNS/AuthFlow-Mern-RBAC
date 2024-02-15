const jwt = require("jsonwebtoken");

export const auth = {

    // jwtAccessAuthCheck
    verifyToken: (req, res, next) => {

        // Extract the token from the Authorization header
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            // 403: forbidden
            return res.status(403).json({ message: "No token provided!" });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized!" });
            }

            // Attach the user information or id from the token to the request object
            req.userId = decoded.id;
            // req.userId = decoded;
        });

        // Log the user information or id
        console.log("User information or id:", req.userId);

        next();

    },

    isAdmin: (req, res, next) => {


        next();
    }
};
/**
     * There are 4 functions:
     * – /api/v1/test/all for public access
     * – /api/v1/test/user for logged in users (any role)
     * – /api/v1/test/mod for moderator users
     * – /api/v1/test/admin for admin users
*/

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
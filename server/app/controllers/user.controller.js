/**
     * There are 4 functions:
     * – /api/v1/test/all for public access
     * – /api/v1/test/user for logged in users (any role)
     * – /api/v1/test/mod for moderator users
     * – /api/v1/test/admin for admin users
*/

const UserModel = require("../models/user.model");

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

// Get all users for admin and moderator
exports.allUsers = async (req, res) => {

    let { id } = req.params;

    try {

        const authenticatedUserId = id; // Assuming you have access to the authenticated user's ID

        // Find all users except the authenticated user
        const users = await UserModel.find({ _id: { $ne: authenticatedUserId } }).populate("role", "name -_id").exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found.",
            });
        }

        res.status(200).json({
            message: "Users retrieved successfully.",
            totalItems: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'Some error occurred while retrieving users', error: error.message });
    }
};

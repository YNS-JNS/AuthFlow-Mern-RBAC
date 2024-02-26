const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const PostModel = require("../models/post.model");
const DB_URL = process.env.DB_URL;

const db = {};

db.mongoose = mongoose;
db.url = DB_URL;
db.user = UserModel;
db.role = RoleModel;
db.post = PostModel;

// Permission or roles: 
db.ROLES = ["user", "admin", "moderator"]

module.exports = db;

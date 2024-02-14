const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("../models/user.model");

const DB_URL = process.env.DB_URL;

const db = {};

db.mongoose = mongoose;
db.url = DB_URL;
db.user = UserModel;

module.exports = db;

const mongoose = require("mongoose");
const TaskModel = require("../models/task.model");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const db = {};

db.mongoose = mongoose;
db.url = DB_URL;
db.tasks = TaskModel

module.exports = db;

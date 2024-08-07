const mongoose = require("mongoose");
require("dotenv").config();

const ConnectionToDB=mongoose.connect(process.env.DB_URL);

module.exports={ConnectionToDB}
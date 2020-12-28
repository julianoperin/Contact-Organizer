const mongoose = require("mongoose");
let validator = require("validator");

//! USER SCHEMA
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//! Export User
module.exports = mongoose.model("user", UserSchema);

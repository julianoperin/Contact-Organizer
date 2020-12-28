const mongoose = require("mongoose");

//! USER SCHEMA
const ContactSchema = mongoose.Schema({
  //! User is the relationship/ it is part of the schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//! Export User
module.exports = mongoose.model("contact", ContactSchema);

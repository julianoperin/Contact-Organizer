const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//? THIS IS JUST THE REGISTER USER => "POST"

//! Import the User Schema
const User = require("../models/User");

//! @route POST "api/users"
//! @description Register
//! @access Public
router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    //! Validation
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    //! Check if user already exists
    let user = await User.findOne({ email: email }); //! FindOne() is from MongoDB

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //! If user is not in the DataBase, create a new Instance
    user = new User({
      name,
      email,
      password,
    });

    //! HASHING THE PASSWORD
    //! Before creating a new user, hash the password
    const salt = await bcrypt.genSalt(10); //! Standard from bcrypt

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //! JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload, //! User ID
      config.get("jwtSecret"),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;

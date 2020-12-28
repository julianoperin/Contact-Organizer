const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth"); //! AUTH MIDDLEWARE
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

//! @route GET api/auth
//! @desc logged in user
//! @access Private

//? JUST Get user from database
//! Running with auth middleware
//? THE POINT OF THIS ROUTE IS TO GET THE LOGGED IN USER
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //! - password cause we dont want to return the password
    //!This code above will get the user from the DataBase
    //? THIS TOKEN HAS THE USER ID INSIDE THE PAYLOAD, THEN WE CAN ACCESS IT AND GET THE USER
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//!
//!
//!
//!

//? WHEN TRYING TO LOG IN
//! @route Post api/auth
//! @desc Auth/LOGIN user and get token
//! @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //! Will check to see if the user has an account
      if (!user) {
        return res.status(400).json({ msg: "No user found with this email" });
      }

      //! I will use bcrypt to compare the passwords to see if they match
      const isMatch = await bcrypt.compare(password, user.password); //!password from user found

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalided credentials, password does not match!" });
      }

      //! This ID is coming from the FindOne() method and if find user ...
      const payload = {
        user: {
          id: user.id, //! id from user found
        },
      };

      jwt.sign(
        payload,
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
      console.log(error.message);
      res.status(500).send({ msg: error.message });
    }
  }
);

module.exports = router;

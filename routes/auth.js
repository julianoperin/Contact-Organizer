const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//! Import the User Schema

const User = require("../models/User");

//! @route GET api/auth
//! @desc logged in user
//! @access Private
//? Get user from database
//! Running with auth middleware
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //! - password cause we dont want to return the password

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//? WHEN TRYING TO LOG IN
//! @route Post api/auth
//! @desc Auth user and get token
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
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //! I will use bcrypt to compare the passwords to see if they match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalided credentials, password does not match!" });
      }

      //! This ID is coming from the FindOne() method after try {} let user =
      const payload = {
        user: {
          id: user.id,
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
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//! Import the User Schema

const User = require("../models/User");

//! @route POST "api/users"
//! @desc Register
//! @access Public
router.post(
  "/",
  //! Express validation for NAME, EMAIL and PASSWORD
  [
    check("name", "Please, name is required").not().isEmpty(),
    check("email", "Please, use a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  //! REQ - RES
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email }); //! FindOne() is from MongoDB

      //! If user is already in the DataBase
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //! If user is not on the DataBase, Instantiate a new object
      user = new User({
        name,
        email,
        password,
      });
      //! HASHING THE PASSWORD
      //! Before creating a new user, hash the password
      const salt = await bcrypt.genSalt(10); //! Standard

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

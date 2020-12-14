const express = require("express");
const router = express.Router();
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("passed");
  }
);

module.exports = router;

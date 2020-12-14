const express = require("express");

const router = express.Router();

//! @route GET api/contact
//! @desc Get all users contacts
//! @access Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

//! @route POST api/contact
//! @desc Get all users contacts
//! @access Private
router.post("/", (req, res) => {
  res.send("Add contacts");
});

//! @route PUT api/contact/:id
//! @desc UPDATE contact
//! @access Private
router.post("/:id", (req, res) => {
  res.send("Update contacts");
});

//! @route DELETE api/contact
//! @desc Delete contact
//! @access Private
router.delete("/", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;

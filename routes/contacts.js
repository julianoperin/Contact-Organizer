const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth"); //! Middleware
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

//? GET ALL CONTACTS
//! @route GET api/contact
//! @desc Get all users contacts
//! @access Private
router.get("/", auth, async (req, res) => {
  //! req.user.id comes with the header token
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    }); //! -1 the most recent contact
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//? ADD NEW CONTACT
//! @route POST api/contact
//! @desc Get all users contacts
//! @access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    //! validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id, //! comes with the auth in the header
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//? UPDATE CONTACT
//! @route PUT api/contact/:id
//! @desc UPDATE contact
//! @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //! Build contact object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //! Make sure user owns the contact
    //! compare the id in the contacts DB to the id that comes with the token
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//? DELETE CONTACT
//! @route DELETE api/contact
//! @desc Delete contact
//! @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //! Make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

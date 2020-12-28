const express = require("express");
const connectDB = require("./config/db");

const app = express();

//! Connect DATABASE
connectDB();

//! Init Middleware
app.use(express.json({ extended: false })); //! So we can access req.body

//! Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to the contact organizer!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

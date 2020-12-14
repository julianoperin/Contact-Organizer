const jwt = require("jsonwebtoken");
const config = require("config");

//! Middleware is used to private routes, to protect the routes

module.exports = function (req, res, next) {
  //! GET TOKEN FROM THE HEADER
  const token = req.header("x-auth-token");

  //! CHECK IF NOT TOKEN
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

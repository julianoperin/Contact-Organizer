const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");

const config = require("config"); //! Using the dependency that we installed

const db = config.get("mongoURI"); //! Get the default JSON from default

//! Connection With ASYNC AWAIT
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

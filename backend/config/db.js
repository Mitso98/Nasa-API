const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo connected");
  } catch (error) {
    console.error("error connecting to Mongo: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

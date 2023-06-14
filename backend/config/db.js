const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");
  } catch (error) {
    global.PINO_LOGGER.PINO_LOGGER.error(
      "error connecting to Mongo: ",
      error.message
    );
    process.exit(1);
  }
};

module.exports = connectDB;

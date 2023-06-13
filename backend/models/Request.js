const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema({
  _id: {
    type: String,
    required: true,
    alias: "nasa_id",
  },
  title: String,
  description: String,
  photographer: String,
  location: String,
  date_created: Date,
  media_type: String,
  center: String,
  keywords: [String],
  thumbnail_url: String,
});

const Request = mongoose.model("MarsImage", RequestSchema);

module.exports = { Request, RequestSchema };

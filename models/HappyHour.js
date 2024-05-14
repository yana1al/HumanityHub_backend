const mongoose = require("mongoose");

const happyHourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true }
});

const HappyHour = mongoose.model("HappyHour", happyHourSchema);

module.exports = HappyHour;

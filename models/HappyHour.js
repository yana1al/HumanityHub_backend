const mongoose = require("mongoose");

// Define schema for Happy Hour events
const happyHourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  zoomLink: {
    type: String, 
    required: false 
  }
});

const HappyHour = mongoose.model("HappyHour", happyHourSchema);

module.exports = HappyHour;

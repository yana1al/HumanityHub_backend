const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  types: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
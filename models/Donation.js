const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donationType: { type: String, required: true }, 
  amount: { type: Number }, 
  date: { type: Date, required: true }, 
  location: { type: String, required: true }, 
  donationArea: { type: String }, 
  description: { type: String, required: true },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;

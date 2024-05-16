// controllers/happyHourController.js
const HappyHour = require('../models/HappyHour');

// Function to fetch all Happy Hour events
exports.getHappyHours = async (req, res) => {
  try {
    const happyHours = await HappyHour.find();
    res.json(happyHours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getHappyHours,
};
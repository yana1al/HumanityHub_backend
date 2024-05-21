const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    name: { type: String, required: true },
    testimony: { type: String, required: true },
    rating: { type: Number, required: true },
    donatedAmount: { type: Number, required: true },
    userId: { type: String, required: true } // Assuming userId is a String
});

module.exports = mongoose.model('Testimony', testimonySchema);

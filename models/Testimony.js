
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    testimony: { type: String, required: true },
    rating: { type: Number, required: true },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);

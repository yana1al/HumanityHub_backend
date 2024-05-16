const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

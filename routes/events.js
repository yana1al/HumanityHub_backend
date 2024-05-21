const express = require('express');
const Event = require('../models/Event'); // Import the Event model
const router = express.Router();

// Route to create an event
router.post('/', async (req, res) => {
    const eventData = req.body;

    try {
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Route to search/view events based on zip code and city
router.get('/', async (req, res) => {
    const { zipCode, city } = req.query;

    try {
        const query = {};
        if (zipCode) query['location.zipCode'] = zipCode;
        if (city) query['location.city'] = city;

        const events = await Event.find(query);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events data' });
    }
});

module.exports = router;

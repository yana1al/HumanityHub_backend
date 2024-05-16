const express = require('express');

const router = express.Router();


// Route to create an event
router.post('/', async (req, res) => {
    const eventData = req.body;

    try {
        // Create a new event using the provided data
        const newEvent = new Event(eventData);
        
        // Save the event to the database
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
        // Fetch events from the database based on zip code and city
        const events = await Event.find({ zipCode, city });

        // Send the events data to the frontend
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events data' });
    }
});

module.exports = router;

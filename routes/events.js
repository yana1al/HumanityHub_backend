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

// Route to update an event by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Route to delete an event by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;

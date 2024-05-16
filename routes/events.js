const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/events', async (req, res) => {
    const { zipCode, city } = req.query;

    try {
        // Make a request to the GlobalGiving API to fetch events data
        const response = await axios.get('https://api.globalgiving.org', {
            params: {
                zipCode: zipCode,
                city: city
            }
        });
        const eventsData = response.data; 

        // Send the events data to the frontend
        res.json(eventsData);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events data' });
    }
});

module.exports = router;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

router.get('/donations', async (req, res) => {
    const { zipCode } = req.query;
  
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=donation+locations+${zipCode}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`);
      const locations = response.data.results.map((result) => ({
        name: result.name,
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        id: result.place_id,
      }));
  
      res.json(locations);
    } catch (error) {
      console.error('Error searching for donation locations:', error);
      res.status(500).json({ error: 'Failed to search for donation locations' });
    }
  });
  

module.exports = router;
// routes/testimonies.js
const express = require('express');
const router = express.Router();
const { Testimony } = require('../models/Testimony');
const { verifyToken, stripToken } = require('../middleware/auth');

// Get all testimonies
router.get('/', async (req, res) => {
  try {
    const testimonies = await Testimony.findAll();
    res.json(testimonies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonies' });
  }
});

// Create a new testimony
router.post('/', stripToken, verifyToken, async (req, res) => {
  const { name, testimony, rating, donatedAmount } = req.body;
  try {
    const newTestimony = await Testimony.create({
      name,
      testimony,
      rating,
      donatedAmount,
      userId: req.user.id // Assign the logged-in user as the creator
    });
    res.status(201).json(newTestimony);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimony' });
  }
});

// Update a testimony
router.put('/:id', stripToken, verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, testimony, rating, donatedAmount } = req.body;
  
  try {
    const existingTestimony = await Testimony.findByPk(id);

    if (!existingTestimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    // Check if the user is the owner or an admin
    if (existingTestimony.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    existingTestimony.name = name;
    existingTestimony.testimony = testimony;
    existingTestimony.rating = rating;
    existingTestimony.donatedAmount = donatedAmount;
    await existingTestimony.save();

    res.json(existingTestimony);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimony' });
  }
});

// Delete a testimony
router.delete('/:id', stripToken, verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const existingTestimony = await Testimony.findByPk(id);

    if (!existingTestimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    // Check if the user is the owner or an admin
    if (existingTestimony.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    await existingTestimony.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimony' });
  }
});

module.exports = router;

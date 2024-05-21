const express = require('express');
const router = express.Router();
const Testimony = require('../models/Testimony');

// Fetch all testimonies
router.get('/', async (req, res) => {
  try {
    const testimonies = await Testimony.findAll();
    res.json(testimonies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonies' });
  }
});

// Create a new testimony
router.post('/', async (req, res) => {
  const { name, testimony, rating, donatedAmount, userId } = req.body;
  try {
    const newTestimony = await Testimony.create({
      name,
      testimony,
      rating,
      donatedAmount,
      userId,  
    });
    res.status(201).json(newTestimony);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimony' });
  }
});

// Update an existing testimony
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, testimony, rating, donatedAmount, userId } = req.body;
  
  try {
    const existingTestimony = await Testimony.findByPk(id);

    if (!existingTestimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    existingTestimony.name = name;
    existingTestimony.testimony = testimony;
    existingTestimony.rating = rating;
    existingTestimony.donatedAmount = donatedAmount;
    existingTestimony.userId = userId;
    await existingTestimony.save();

    res.json(existingTestimony);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimony' });
  }
});

// Delete a testimony
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existingTestimony = await Testimony.findByPk(id);

    if (!existingTestimony) {
      return res.status(404).json({ error: 'Testimony not found' });
    }

    await existingTestimony.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimony' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const happyHourController = require('../controllers/happyHourController');

// Define routes for CRUD operations
router.get('/', happyHourController.getAllHappyHours);
router.get('/:id', happyHourController.getHappyHourById);
router.post('/', happyHourController.createHappyHour);
router.put('/:id', happyHourController.updateHappyHour);
router.delete('/:id', happyHourController.deleteHappyHour);

module.exports = router;

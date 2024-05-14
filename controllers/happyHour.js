const HappyHour = require('../models/HappyHour');

// Controller functions for CRUD operations
exports.getAllHappyHours = async (req, res) => {
  try {
    const happyHours = await HappyHour.find();
    res.json(happyHours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHappyHourById = async (req, res) => {
  try {
    const happyHour = await HappyHour.findById(req.params.id);
    if (happyHour) {
      res.json(happyHour);
    } else {
      res.status(404).json({ message: 'Happy hour not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHappyHour = async (req, res) => {
  const happyHour = new HappyHour(req.body);
  try {
    const newHappyHour = await happyHour.save();
    res.status(201).json(newHappyHour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHappyHour = async (req, res) => {
  try {
    const updatedHappyHour = await HappyHour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHappyHour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHappyHour = async (req, res) => {
  try {
    await HappyHour.findByIdAndDelete(req.params.id);
    res.json({ message: 'Happy hour deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

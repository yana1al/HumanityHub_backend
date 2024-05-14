const express = require("express");
const router = express.Router();
const HappyHour = require("../models/HappyHour");

// GET Happy Hour details by ID
router.get("/:id", async (req, res) => {
  try {
    const happyHour = await HappyHour.findById(req.params.id);
    if (!happyHour) {
      return res.status(404).json({ message: "Happy Hour not found" });
    }
    res.json(happyHour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const donationsController = require("../controllers/donations");

router.get("/", donationsController.getDonations);

module.exports = router;
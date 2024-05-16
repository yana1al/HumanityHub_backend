
const express = require("express");
const Donation = require("../models/Donation");
const stripe = require("stripe")("rk_test_51PGOC106R1SUboG0ob27UKItDgwi5JrpL5M5OuBkEoEZoN2x3L5Y1FjKsEKaIg8H1LD5SG9fUOwWHbJJjzJ63823005gRvhwDn");


exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
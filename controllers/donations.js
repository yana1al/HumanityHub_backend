const express = require("express");
const Donation = require("../models/Donation");
const stripe = require("stripe")("rk_test_51PGOC106R1SUboG0ob27UKItDgwi5JrpL5M5OuBkEoEZoN2x3L5Y1FjKsEKaIg8H1LD5SG9fUOwWHbJJjzJ63823005gRvhwDn");

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const createDonation = async (req, res) => {
  try {
    const { amount, currency, source } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
      description: 'Donation charge',
    });
    const newDonation = new Donation({
      amount,
      currency,
      source,
      chargeId: charge.id,
    });
    await newDonation.save();
    res.status(201).json({ message: "Donation created successfully", charge });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getDonations,
  createDonation,
};

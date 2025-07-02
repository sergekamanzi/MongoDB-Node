const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const sendBookingEmail = require('../utils/emailService'); // import the email utility

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    // 1. Save booking to MongoDB
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    // 2. Send confirmation email to the user
    await sendBookingEmail(savedBooking); // Use saved data for accuracy

    // 3. Return success response
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('❌ Booking submission failed:', err);
    res.status(500).json({ error: 'Failed to submit booking. Please try again.' });
  }
});

module.exports = router;

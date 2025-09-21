const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phoneNumber, bookingType, date, time, guests } = req.body;

  try {
    const newBooking = new Booking({
      name,
      email,
      phoneNumber,
      bookingType,
      date,
      time,
      guests,
    });

    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
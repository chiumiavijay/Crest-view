const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bookingType: {
    type: String,
    enum: ['Restaurant', 'Room'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false, // Updated to be optional
  },
  guests: {
    type: Number,
    required: function() { return this.bookingType === 'Restaurant'; },
  },
  bedType: {
    type: String,
    enum: ['single', 'double'],
    required: function() { return this.bookingType === 'Room'; },
  },
  numberOfRooms: {
    type: Number,
    required: function() { return this.bookingType === 'Room'; },
    min: 1,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
// backend/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  package: String,
  checkIn: String,
  checkOut: String,
  adults: Number,
  children: Number,
  name: String,
  email: String,
  phone: String,
  country: String,
  city: String,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);

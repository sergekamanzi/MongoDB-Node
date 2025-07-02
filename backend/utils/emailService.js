const nodemailer = require('nodemailer');
require('dotenv').config();

// 1. Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Function to send a structured email to the customer
const sendBookingEmail = async (bookingData) => {
  const mailOptions = {
    from: `"Booking Confirmation" <${process.env.EMAIL_USER}>`,
    to: bookingData.email, // 📤 Email is sent to user who filled the form
    subject: '✅ Your Booking Confirmation',
    html: `
      <h2>Thank you for booking with us, ${bookingData.name}!</h2>
      <p>We have received your booking. Here are the details:</p>
      <ul>
        <li><strong>Package:</strong> ${bookingData.package}</li>
        <li><strong>Check-in Date:</strong> ${bookingData.checkIn}</li>
        <li><strong>Check-out Date:</strong> ${bookingData.checkOut}</li>
        <li><strong>Number of Adults:</strong> ${bookingData.adults}</li>
        <li><strong>Number of Children:</strong> ${bookingData.children}</li>
        <li><strong>Name:</strong> ${bookingData.name}</li>
        <li><strong>Email:</strong> ${bookingData.email}</li>
        <li><strong>Phone:</strong> ${bookingData.phone}</li>
        <li><strong>Country:</strong> ${bookingData.country}</li>
        <li><strong>City:</strong> ${bookingData.city}</li>
        <li><strong>Notes:</strong> ${bookingData.notes || 'None'}</li>
      </ul>
      <p>We’ll be in touch soon. If you have questions, simply reply to this email.</p>
      <br />
      <p>Best regards,<br/>Booking Team</p>
    `
  };

  // 3. Send the email with callback for logging
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email sending failed:', error.message);
    } else {
      console.log(`✅ Confirmation email sent to ${bookingData.email}:`, info.response);
    }
  });
};

module.exports = sendBookingEmail;

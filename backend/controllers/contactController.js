const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendMail = require('../utils/sendEmail');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  // Validations
  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup.');
  }
  if (!subject || !message) {
    res.status(400);
    throw new Error('Please add subject and message.');
  }

  const sentFrom = process.env.EMAIL_USER;
  const sendTo = process.env.EMAIL_USER;
  const replyTo = user.email;
  // Send email
  try {
    await sendMail(subject, message, sendTo, sentFrom, replyTo);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

module.exports = {
  contactUs,
};

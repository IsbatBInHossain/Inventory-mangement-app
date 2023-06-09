const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Token = require('../models/tokenModel');
const sendMail = require('../utils/sendEmail');

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

//* Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must have at least 6 characters');
  }

  // Check if User already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('This email is already in use');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    // secure: process.env.NODE_ENV === 'development' ? false : true,
    secure: true,
  });

  // Check if user exists
  if (user) {
    const { _id, name, password, phone, email, photo, bio } = user;
    res.status(201).json({
      _id,
      name,
      password,
      phone,
      email,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//* Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  // Find user
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(400);
    throw new Error('User not found, Please signup');
  }

  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    // secure: process.env.NODE_ENV === 'development' ? false : true,
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, password, phone, email, photo, bio } = user;
    res.status(200).json({
      _id,
      name,
      password,
      phone,
      email,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

//* Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Expire the cookie token
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'development' ? false : true,
  });
  res.status(200).json({
    message: 'Successfully logged out',
  });
});

//* Get User Data
const getUser = asyncHandler(async (req, res) => {
  // Find User
  const user = await User.findById(req.user._id);

  // Check if user exists
  if (user) {
    const { _id, name, password, phone, email, photo, bio } = user;
    res.status(200).json({
      _id,
      name,
      password,
      phone,
      email,
      photo,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

//* Check login status
const loginStatus = asyncHandler(async (req, res) => {
  // Check if token expired
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//* Update User Data
const UpdateUser = asyncHandler(async (req, res) => {
  // Find User
  const user = await User.findById(req.user._id);

  // Check if user exists
  if (user) {
    const { _id, name, phone, email, photo, bio } = user;

    // Update user data
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.photo = req.body.photo || photo;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//* Change Password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }
  const { oldPassword, password } = req.body;

  // Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error('Please enter the old password and the new password');
  }

  // Check if the password matches
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).json('Password has been changed');
  } else {
    res.status(400);
    throw new Error('Password is incorrect, please enter the right password.');
  }
});

//* Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }
  // Delete token if it already exists
  const token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }
  // Create reset token
  const resetToken = crypto.randomBytes(32).toString('hex') + user._id;

  // Hash the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000,
  }).save();

  // Construct reset URL
  const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Construck the email
  const message = `
  <h2>Hello ${user.name}</h2>

  <p>You have requested for a password reset.</p>
  <p>Please click the url below to reset your password.</p>
  <p>The link will expire in thirty minutes</p>

  <a href=${resetURL} clicktracking=off >${resetURL}</a>
  <p>Best wishes...</p>
  <p><strong>Warehouse Wizard Team</strong></p>
  `;

  const subject = 'Password reset request';
  const sendTo = user.email;
  const sentFrom = process.env.EMAIL_USER;

  try {
    await sendMail(subject, message, sendTo, sentFrom);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

//* Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then find in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  // Check token validity
  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or expired token');
  }

  // FInd the user and reset password
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: 'Password reset successful, please log in.',
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  UpdateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

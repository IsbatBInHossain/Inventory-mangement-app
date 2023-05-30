const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    secure: process.env.NODE_ENV === 'development' ? false : true,
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
    secure: process.env.NODE_ENV === 'development' ? false : true,
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
  res.json({
    message: 'Successfully logged out',
  });
});
module.exports = { registerUser, loginUser, logoutUser };

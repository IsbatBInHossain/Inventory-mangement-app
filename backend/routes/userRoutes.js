const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
} = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);

module.exports = router;

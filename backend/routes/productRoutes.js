const express = require('express');
const {
  createProduct,
  getProduct,
  getSingleProduct,
} = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');
const { upload } = require('../utils/fileUpload');
const router = express.Router();

router.post('/', protect, upload.single('image'), createProduct);
router.get('/', protect, upload.single('image'), getProduct);
router.get('/:id', protect, upload.single('image'), getSingleProduct);

module.exports = router;

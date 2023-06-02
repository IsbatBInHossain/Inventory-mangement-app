const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');
const { upload } = require('../utils/fileUpload');

router.post('/', protect, upload.single('image'), createProduct);
router.patch('/:id', protect, upload.single('image'), updateProduct);
router.get('/', protect, getProduct);
router.get('/:id', protect, getSingleProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;

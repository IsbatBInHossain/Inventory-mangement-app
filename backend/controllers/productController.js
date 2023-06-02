const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');

//* Create new Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error('Please fill in all the fields.');
  }

  // Manage Image upload
  let fileData = {};
  if (req.file) {
    // Upload image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Warehouse Wizard',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Falied to upload image');
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create new Product
  const product = await Product.create({
    user: req.user._id,
    name,
    sku,
    price,
    description,
    quantity,
    category,
    image: fileData,
  });
  res.status(201).json(product);
});

//* Get All Products
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id }).sort(
    '-createdAt'
  );
  res.status(200).json(products);
});

//* Get a Single Products
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  res.status(200).json(product);
});

//* Delete a Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Match product to the User
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await product.remove();
  res.status(200).json({ message: 'Product deleted Successfully' });
});

//* Update a Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const id = req.params.id;

  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Match product to the User
  if (product.user.toString() !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Manage Image upload
  let fileData = {};
  if (req.file) {
    // Upload image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Warehouse Wizard',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Falied to upload image');
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      price,
      description,
      quantity,
      category,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};

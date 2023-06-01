const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req, res) => {
  res.send('Product created');
});

module.exports = {
  createProduct,
};

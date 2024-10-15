// Importing required modules
const catchAsync = require('../utils/catchAsync');

const {
  createProduct,
  getProducts,
  deleteProducts,
  getProductWithId,
  updateProduct,
} = require('../services/productServices');
const ApiError = require('../utils/ApiError');
const { STATUS_CODES } = require('http');

// Controller to add a new product
exports.addProduct = catchAsync(async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json({
    status: 'success',
    data: product,
  });
});

// Controller to update an existing product by ID
exports.updateProduct = catchAsync(async (req, res) => {
  const product = await updateProduct(req);
  res.status(200).json({ status: 'success', product: product });
});

// Controller to get a single product by ID
exports.getProduct = catchAsync(async (req, res) => {
  const product = await getProductWithId(req.params.id);
  res.status(200).json({
    status: 'success',
    product: product,
  });
});

// Controller to delete a product by ID
exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await deleteProducts(req);
  res.status(202).json({
    status: 'success',
    message: 'Delete successfully',
    product: product,
  });
});

exports.offer = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.field = 'name,rating,price';
  next();
};

// Controller to get all products with filtering, sorting, field limiting, and pagination
exports.getAllProduct = catchAsync(async (req, res) => {
  const products = await getProducts(req);
  res.status(200).json({
    status: 'success',
    data: products,
  });
});

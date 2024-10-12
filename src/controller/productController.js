// Importing required modules
const mongoose = require('mongoose');
const APIFeatures = require('./../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const product = require('../models/productModels');
const {
  createProduct,
  getProducts,
  deleteProducts,
} = require('../services/productServices');

exports.offer = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.field = 'name,rating,price';
  next();
};

// Controller to add a new product
exports.addProduct = catchAsync(async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json({
    status: 'success',
    data: product,
  });
});

// Controller to update an existing product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedData = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Run validators on the update operation
      }
    );
    res.status(200).json({
      status: 'success',
      data: updatedData,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

// Controller to get a single product by ID
exports.getProduct = catchAsync(async (req, res, next) => {
  // try {
  //   const singleProduct = await product.findById(req.params.id);
  //   if (!singleProduct) {
  //     return next(new ApiError(httpStatus.NOT_FOUND, 'Product not found'));
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: singleProduct,
  //   });
  // } catch (err) {
  //   return next(
  //     new ApiError(httpStatus.FAILED_DEPENDENCY, 'Failed to fetch product')
  //   );
  // }
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

// Controller to get all products with filtering, sorting, field limiting, and pagination
exports.getAllProduct = catchAsync(async (req, res) => {
  const products = await getProducts(req);
  res.status(200).json({
    status: 'success',
    data: products,
  });
  // try {
  //   const features = new APIFeatures(o.find(), req.query)
  // .filter()
  // .sort()
  // .limitField()
  // .pagination();

  //   const allproducts = await features.query;

  //   res.status(200).json({
  //     status: 'success',
  //     result: allproducts.length,
  //     data: allproducts,
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'failed',
  //     result: 'Something went wrong',
  //     message: `${err}`,
  //   });
  // }
});

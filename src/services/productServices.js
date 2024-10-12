// const addProduct = async;
const httpStatus = require('http-status');
const productSchema = require('../models/productModels');
const ApiError = require('../utils/ApiError');
const APIFeatures = require('../utils/ApiFeatures');
const getProductWithId = async id => {
  const singleProduct = await productSchema.findOne({ id: id });
  return singleProduct;
};
const getProducts = async filter => {
  const products = await new APIFeatures(productSchema.find(), filter.query)
    .filter()
    .sort()
    .limitField()
    .pagination();

  return await products.query;
};
const createProduct = async product => {
  const newProduct = await productSchema.create(product);
  return newProduct;
};
const deleteProducts = async productID => {
  const product = await productSchema.findByIdAndDelete(productID.params.id);
  if (product === null) {
    throw new ApiError(httpStatus.GONE, 'Product not found');
  }
  return product;
};
module.exports = {
  getProductWithId,
  getProducts,
  createProduct,
  deleteProducts,
};

// const addProduct = async;
const httpStatus = require('http-status');
const productSchema = require('../models/productModels');
const ApiError = require('../utils/ApiError');
const APIFeatures = require('../utils/ApiFeatures');
const getProductWithId = async id => {
  const singleProduct = await productSchema.findOne({ _id: id });
  console.log(singleProduct);
  if (!singleProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
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
const updateProduct = async productreq => {
  const updatedData = await productSchema.findByIdAndUpdate(
    productreq.params.id,
    productreq.body,
    {
      new: true,
      runValidators: true, // Run validators on the update operation
    }
  );
  return updatedData;
};

module.exports = {
  getProductWithId,
  getProducts,
  createProduct,
  deleteProducts,
  updateProduct,
};

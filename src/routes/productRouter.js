const express = require('express');
const {
  checkBody,
  getAllProduct,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  offer,
} = require('./../controller/productController');
const { validateProductId } = require('../middleware/validatroIdMiddleware');
const productValidation = require('../validation/product.validation');
const validate = require('../middleware/validate');
const productRouter = express.Router();

// productRouter.param('id');
productRouter
  .route('/')
  .get(getAllProduct)
  .post(validate(productValidation.addProduct), addProduct);
productRouter.route('/offer').get(offer);
productRouter
  .route('/:id')
  .get(validateProductId, getProduct)
  .delete(validateProductId, deleteProduct)
  .patch(validateProductId, updateProduct);

module.exports = productRouter;

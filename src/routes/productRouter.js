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
const { protect } = require('../services/authServices');

const productRouter = express.Router();

// productRouter.param('id');
productRouter
  .route('/')
  .get(protect, getAllProduct)
  .post(validate(productValidation.addProduct), addProduct);
productRouter.route('/offer').get(offer, getAllProduct);
productRouter
  .route('/:id')
  .get(validateProductId, getProduct)
  .delete(validateProductId, deleteProduct)
  .patch(
    validateProductId,
    validate(productValidation.addProduct),
    updateProduct
  );

module.exports = productRouter;

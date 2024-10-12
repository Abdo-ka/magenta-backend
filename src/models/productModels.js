const mongoose = require('mongoose');
const excludeFieldsFromSchema = require('../utils/globalExcludeFields');
// Defining the schema for the product model
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'], // Name is required
  },
  discreption: {
    type: String,
    required: [true, 'Product must have a discreption'], // discreption is required
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price'], // Price is required
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // Hide this field from the output
  },
  imageCover: {
    type: String,
    required: [false, 'Image is important for publishing the Product'], // Image cover is required
  },
});
const product = mongoose.model('product', ProductSchema);
excludeFieldsFromSchema(ProductSchema);
module.exports = product;

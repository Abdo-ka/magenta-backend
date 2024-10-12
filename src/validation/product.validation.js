const Joi = require('joi');
const addProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.string().required(),
    discreption: Joi.string().required(),
  }),
};
module.exports = {
  addProduct,
};

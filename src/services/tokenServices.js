const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const generateAuthTokens = async User => {
  return jwt.sign({ id: User.id }, process.env.JWT_SECRET);
};
module.exports = {
  generateAuthTokens,
};

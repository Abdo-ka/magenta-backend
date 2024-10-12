const httpStatus = require('http-status');
const User = require('../models/userModels');
const ApiError = require('../utils/ApiError');

const getUserByEmail = async email => {
  return User.findOne({ email }).select('+password');
};
const createUser = async userBody => {
  if (await User.findOne({ email: userBody.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};
module.exports = {
  getUserByEmail,
  createUser,
};

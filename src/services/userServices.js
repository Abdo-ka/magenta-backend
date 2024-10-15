const httpStatus = require('http-status');
const User = require('../models/userModels');
const ApiError = require('../utils/ApiError');

const getUserByEmail = async email => {
  return User.findOne({ email }).select('+password -passwordChangedAt');
};
const createUser = async userBody => {
  if (await User.findOne({ email: userBody.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  user.password = undefined;
  return user;
};
const getUserById = async id => {
  return User.findById(id).select('+password -passwordChangedAt');
};
module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
};

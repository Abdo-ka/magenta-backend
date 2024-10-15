const userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  user.password = undefined;
  return user;
};
const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You must be logged in for this action'
    );
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await userService.getUserById(decoded.id);
  if (!currentUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'The user no longer exists');
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'User recently changed password! Please log in again.'
    );
  }
  // Grant access to the protected route
  req.user = currentUser;
  next();
});

module.exports = {
  loginUserWithEmailAndPassword,
  protect,
};

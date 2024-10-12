const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/userModels');
const ApiError = require('../utils/ApiError');
const authService = require('../services/authServices');
const tokenService = require('../services/tokenServices');
const catchAsync = require('../utils/catchAsync');
const { createUser } = require('../services/userServices');
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});
exports.register = catchAsync(async (req, res, next) => {
  const user = await createUser(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.status(201).json({
    status: 'success',
    data: user,
    token: token,
  });
});

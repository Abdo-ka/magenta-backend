const express = require('express');
const { register, checkBody, login } = require('../controller/userController');
const authValidation = require('../validation/auth.validation');
const validate = require('../middleware/validate');

const UserRouter = express.Router();

// Make sure validate(authValidation.login) is passed as middleware
UserRouter.route('/login').post(validate(authValidation.login), login);
UserRouter.route('/register').post(validate(authValidation.register), register);
UserRouter.route('/delete').delete();

module.exports = UserRouter;

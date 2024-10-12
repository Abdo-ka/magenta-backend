const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const excludeFieldsFromSchema = require('../utils/globalExcludeFields');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'], // Name is required
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User must have a Email'], // Email is required
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Enter Valid Email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a Password'], // Email is required
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Password must contain at least one letter and one number'
        );
      }
    },
    private: true,
    select: false,
  },
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.model('User', UserSchema);
excludeFieldsFromSchema(UserSchema);
module.exports = User;

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
    required: [true, 'User must have an Email'], // Email is required
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Enter Valid Email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a Password'], // Password is required
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
  passwordChangedAt: {
    type: Date,
    select: false,
  }, // Track when the password was last changed
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    select: false,
  },
});

// Method to compare password
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to check if password was changed after token was issued
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means password was not changed after token was issued
  return false;
};

// Middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Update passwordChangedAt property for the user
  this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure the token is always issued after the change

  next();
});

// Automatically exclude sensitive fields in the response
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.passwordChangedAt; // Exclude passwordChangedAt
  delete userObject.role;

  return userObject;
};

const User = mongoose.model('User', UserSchema);

// Exclude private fields from schema
excludeFieldsFromSchema(UserSchema);

module.exports = User;

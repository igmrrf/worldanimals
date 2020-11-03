const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const config = require('config');
const joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    default: 'free',
    lowercase: true,
  },
  serial_number: {
    type: Number,
    unique: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.generateAuth = function () {
  return jwt.sign(
    {
      id: this.id,
      serial_number: this.serial_number,
      is_verified: this.is_verified,
    },
    config.get('jwt_secret_key')
  );
};

userSchema.plugin(AutoIncrement, { inc_field: 'serial_number' });
userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', userSchema);
const validate = (userData) => {
  const user = joi.object({
    name: joi.string().min(6).max(100).required().lowercase(),
    email: joi.string().email().required().lowercase().min(10).max(100),
    mobile: joi.number().min(10).max(10).required(),
    password: joi.string().min(10).max(1024).required(),
  });
  return user.validate(userData);
};

module.exports = { User, validate };

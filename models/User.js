const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const config = require('config');
const joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema(
  {
    full_name: {
      first_name: {
        type: String,
        required: true,
        index: true,
      },
      last_name: {
        type: String,
        required: true,
        index: true,
      },
      alias: name,
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
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 200,
    },
    serial_number: {
      type: Number,
      unique: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'user',
    minimize: false,
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

userSchema.query.byPlan = function (plan) {
  return this.where({ plan: new RegExp(plan, i) });
};

userSchema
  .virtual('full_name')
  .get(function () {
    return this.name.first_name + ' ' + this.name.last_name;
  })
  .set(function (name) {
    this.name.first_name = name.substr(0, name.indexOf(' '));
    this.name.last_name = name.substr(name.indexOf(' ') + 1);
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

const Joi = require("joi");
const emailRegexp = require("../constants/user-constants");

const userSignupSchema = {
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
};

const userSigninSchema = {
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
};

module.exports = {
  userSignupSchema,
  userSigninSchema,
};

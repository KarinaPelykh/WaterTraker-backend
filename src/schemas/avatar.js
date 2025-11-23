const Joi = require("joi");

const avatarSchema = Joi.object({
  image: Joi.string(),
});

const avatarUpdateSchema = Joi.object({
  image: Joi.string(),
});

module.exports = { avatarSchema, avatarUpdateSchema };

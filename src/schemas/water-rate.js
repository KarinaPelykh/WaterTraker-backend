const Joi = require("joi");

const waterRateSchema = Joi.object({
  gender: Joi.string().required(),
  weight: Joi.number().required(),
  activeTime: Joi.number().required(),
});

module.exports = waterRateSchema;

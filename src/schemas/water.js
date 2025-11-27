const Joi = require("joi");
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const waterRecordSchema = Joi.object({
  time: Joi.string().required().pattern(timePattern),
  amount: Joi.string().required(),
});

const updateWaterRecordSchema = Joi.object({
  time: Joi.string().pattern(timePattern),
  amount: Joi.string(),
});

module.exports = {
  waterRecordSchema,
  updateWaterRecordSchema,
};

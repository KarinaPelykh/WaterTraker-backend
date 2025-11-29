const Joi = require("joi");
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const waterRecordSchema = Joi.object({
  time: Joi.string().required().pattern(timePattern),
  amount: Joi.number().required(),
});

const updateWaterRecordSchema = Joi.object({
  time: Joi.string().pattern(timePattern),
  amount: Joi.number(),
});

module.exports = {
  waterRecordSchema,
  updateWaterRecordSchema,
};

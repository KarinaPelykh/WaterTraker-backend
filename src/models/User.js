const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleValidateError, runUpdateValidators } = require("./hooks");
const emailRegexp = require("../constants/user-constants");

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, match: emailRegexp },
    password: { type: string, minlength: 6, require: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);
userSchema.pre("findOneAndUpdate", runUpdateValidators);
userSchema.post("findOneAndUpdate", handleValidateError);
const User = model("user", userSchema);

module.exports = User;

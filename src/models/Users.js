const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");
const emailRegexp = require("../constants/user-constants");

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true, match: emailRegexp },
    password: { type: String, minlength: 6, require: true },
    image: { type: String },
    gender: { type: String },
    token: { type: String },
    water: { type: String },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleValidateError);
userSchema.pre("findOneAndUpdate", runUpdateValidators);
userSchema.post("findOneAndUpdate", handleValidateError);
const User = model("user", userSchema);

module.exports = User;

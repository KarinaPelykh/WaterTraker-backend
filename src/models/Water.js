const { Schema, model } = require("mongoose");

const waterSchema = new Schema(
  {
    time: { type: String },
    amount: { type: Number, required: true, min: 0, max: 1500 },
  },
  { versionKey: false, timestamps: true }
);

const Water = model("water", waterSchema);
module.exports = Water;

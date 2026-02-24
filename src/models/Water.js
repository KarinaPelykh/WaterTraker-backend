const { Schema, model } = require("mongoose");

const waterSchema = new Schema(
  {
    dailyGoal: { type: Number },
    time: { type: String },
    amount: { type: Number, required: true, min: 0, max: 1500 },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },

  { versionKey: false, timestamps: true },
);

const Water = model("water", waterSchema);
module.exports = Water;

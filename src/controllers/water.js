const Water = require("../models/Water");

const addConsumedWater = async (req, res) => {
  const data = req.body;

  await Water.create({ ...data });
  res.status(200).json("success");
};

module.exports = {
  addConsumedWater,
};

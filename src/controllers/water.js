const { HttpError, ctrlWrapper } = require("../helpers");
const User = require("../models/Users");
const Water = require("../models/Water");

const getAll = async (req, res) => {
  const date = await Water.find();
  res.status(200).json(date);
};

const addConsumedWater = async (req, res) => {
  await Water.create(req.body);
  res.status(201).json("Success");
};

const updateByID = async (req, res) => {
  const { id } = req.params;
  const response = await Water.findByIdAndUpdate(id, req.body, { new: true });
  res.json(response);
};

const deleteSign = async (req, res) => {
  const { id } = req.params;
  const response = await Water.findByIdAndDelete(id);
  if (!response) {
    throw HttpError(404);
  }
  res.json({ message: "Delete success" });
};

const usedWater = async (req, res) => {
  const { id } = req.params;

  const { startOfDay, endOfDay } = {
    startOfDay: new Date(),
    endOfDay: new Date(),
  };
  startOfDay.setHours(0, 0, 0, 0);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await Water.find({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const amountOfUsedWater = data.reduce((sum, item) => (sum += item.amount), 0);
  const waterInLiters = amountOfUsedWater / 1000;

  const user = await User.findById(id);
  if (!user || !user.water) {
    throw HttpError(404);
  }
  const percent = (waterInLiters / Number(user.water)) * 100;
  res.json({ percent: Math.round(percent), list: data });
};

module.exports = {
  addConsumedWater: ctrlWrapper(addConsumedWater),
  getAll: ctrlWrapper(getAll),
  updateByID: ctrlWrapper(updateByID),
  deleteSign: ctrlWrapper(deleteSign),
  usedWater: ctrlWrapper(usedWater),
};

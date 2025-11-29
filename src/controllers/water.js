const months = require("../constants/months");
const { HttpError, ctrlWrapper } = require("../helpers");
const User = require("../models/Users");
const Water = require("../models/Water");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const date = await Water.find({ owner });
  res.status(200).json(date);
};

const addConsumedWater = async (req, res) => {
  const { _id: owner } = req.user;

  await Water.create({ ...req.body, owner });
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

const usedWaterByToday = async (req, res) => {
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

  const total = data.reduce((sum, item) => (sum += item.amount), 0);
  const liters = total / 1000;

  const user = await User.findById(id);
  if (!user || !user.water) {
    throw HttpError(404);
  }
  const percent = (liters / Number(user.water)) * 100;
  res.json({ percent: Math.round(percent), list: data });
};

const usedWaterByMonth = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  const [year, month] = date.split(".");
  const monthIndex = Number(month) - 1;
  const dayInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();

  const user = await User.findById(id);
  if (!user || !user.water) {
    throw HttpError(404);
  }

  const result = [];

  for (let day = 1; day <= dayInMonth; day++) {
    const start = new Date(year, monthIndex, day, 0, 0, 0, 0);
    const end = new Date(year, monthIndex, day, 23, 59, 59, 999);

    const data = await Water.find({
      createdAt: { $gte: start, $lte: end },
    });

    const total = data.reduce((sum, item) => (sum += item.amount), 0);

    const liters = total / 1000;
    const percent = (liters / Number(user.water)) * 100;

    result.push({
      dailyNormWater: user.water,
      percent: Math.round(percent),
      list: data,
      date: `${day},${months[monthIndex]}`,
    });
  }
  res.json(result);
};

module.exports = {
  addConsumedWater: ctrlWrapper(addConsumedWater),
  getAll: ctrlWrapper(getAll),
  updateByID: ctrlWrapper(updateByID),
  deleteSign: ctrlWrapper(deleteSign),
  usedWaterByToday: ctrlWrapper(usedWaterByToday),
  usedWaterByMonth: ctrlWrapper(usedWaterByMonth),
};

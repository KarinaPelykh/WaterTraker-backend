const { ctrlWrapper, cloudinary } = require("../helpers");
const fs = require("fs/promises");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  const userInfo = {
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
  };

  res.status(200).json({ userInfo });
};

const addUserAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: filePath } = req.file;
  const { url: avatar } = await cloudinary.uploader.upload(filePath, {
    folder: "water-track",
  });

  await fs.unlink(filePath);
  await User.findByIdAndUpdate(id, { image: avatar });

  res.status(201).json({ message: "Image added successfully" });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: filePath } = req.file;
  const { url: avatar } = await cloudinary.uploader.upload(filePath, {
    folder: "water-track",
  });

  await fs.unlink(filePath);
  await User.findByIdAndUpdate(id, { image: avatar });

  res.status(200).json({ message: "Image update successfully" });
};

const updateUserInfo = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  const updateInfo = {};

  if (name) {
    updateInfo.name = name;
  }
  if (email) {
    updateInfo.email = email;
  }
  if (password) {
    updateInfo.password = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updateInfo);
  res.status(200).json({ user: { name, email } });
};

const addUserWaterRate = async (req, res) => {
  const { gender, weight, activeTime } = req.body;
  const { id } = req.user;
  const waterRate =
    gender === "woman"
      ? Math.floor(weight * 0.03 + activeTime * 0.4)
      : Math.floor(weight * 0.04 + activeTime * 0.6);
  const response = await User.findByIdAndUpdate(id, { water: waterRate });
  res.status(201).json({ water: waterRate });
};

module.exports = {
  getUser: ctrlWrapper(getUser),
  addUserAvatar: ctrlWrapper(addUserAvatar),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  addUserWaterRate: ctrlWrapper(addUserWaterRate),
};

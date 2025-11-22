const ctrlWrapper = require("../helpers/ctrlWrapper");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const getUser = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);
  res.status(200).json({ user });
};

const updateAvatar = async (req, res) => {};

const updateUserInfo = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  const updataInfo = {};

  if (name) {
    updataInfo.name = name;
  }
  if (email) {
    updataInfo.email = email;
  }
  if (password) {
    updataInfo.password = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updataInfo);
  res.status(201).json({ user: { name, email } });
};

module.exports = {
  getUser: ctrlWrapper(getUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserInfo: ctrlWrapper(updateUserInfo),
};

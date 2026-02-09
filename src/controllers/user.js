const { ctrlWrapper, cloudinary, HttpError } = require("../helpers");
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
    water: user.water,
  };

  res.status(200).json(userInfo);
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

const addUserWaterRate = async (req, res) => {
  const { gender, weight, activeTime } = req.body;
  const { id } = req.user;
  const waterRate =
    gender === "woman"
      ? Math.floor(weight * 0.03 + activeTime * 0.4)
      : Math.floor(weight * 0.04 + activeTime * 0.6);

  await User.findByIdAndUpdate(id, { water: waterRate });
  res.status(201).json({ water: waterRate });
};

const updateUserInfo = async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  const { _id: owner } = req.user;

  const updateInfo = {};

  if (name) updateInfo.name = name;

  if (email) updateInfo.email = email;

  if (currentPassword) {
    const user = await User.findById(owner);

    if (!user) {
      throw new HttpError(401);
    }

    const compare = await bcrypt.compare(currentPassword, user.password);

    if (!compare) {
      throw new HttpError(401, "Invalid password");
    }

    if (!newPassword) {
      throw new HttpError(400, "New password is required to make changes");
    }

    updateInfo.password = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(owner, updateInfo, {
    new: true,
  });

  res.status(201).json({ email: updatedUser.email });
};

module.exports = {
  getUser: ctrlWrapper(getUser),
  addUserAvatar: ctrlWrapper(addUserAvatar),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  addUserWaterRate: ctrlWrapper(addUserWaterRate),
};

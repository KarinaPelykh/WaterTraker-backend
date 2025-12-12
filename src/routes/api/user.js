const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const router = express.Router();
const ctrl = require("../../controllers/user");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/avatar");
const waterRateSchema = require("../../schemas/water-rate");

const avatarValidateMiddleware = validateBody(schema.avatarSchema);
const avatarUpdateValidateMiddleware = validateBody(schema.avatarUpdateSchema);
const waterRateValidateMiddleware = validateBody(waterRateSchema);

router.use(authenticate);

router.get("/", ctrl.getUser);

router.post(
  "/avatar",
  upload.single("avatar"),

  avatarValidateMiddleware,
  ctrl.addUserAvatar,
);

router.patch(
  "/avatar",
  upload.single("avatar"),

  avatarUpdateValidateMiddleware,
  ctrl.updateAvatar,
);

router.patch("/", ctrl.updateUserInfo);

router.patch(
  "/water-rate",

  waterRateValidateMiddleware,
  ctrl.addUserWaterRate,
);

module.exports = router;

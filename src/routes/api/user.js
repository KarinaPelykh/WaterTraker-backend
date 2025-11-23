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

router.get("/", authenticate, ctrl.getUser);

router.post(
  "/avatar",
  upload.single("avatar"),
  authenticate,
  avatarValidateMiddleware,
  ctrl.addUserAvatar
);

router.patch(
  "/avatar",
  upload.single("avatar"),
  authenticate,
  avatarUpdateValidateMiddleware,
  ctrl.updateAvatar
);

router.patch("/", authenticate, ctrl.updateUserInfo);

router.patch(
  "/water-rate",
  authenticate,
  waterRateValidateMiddleware,
  ctrl.addUserWaterRate
);

module.exports = router;

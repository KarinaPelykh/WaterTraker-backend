const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const router = express.Router();
const ctrl = require("../../controllers/user");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/avatar");

const avatarValidateMiddleware = validateBody(schema.avatarSchema);
const avatarUpdateValidateMiddleware = validateBody(schema.avatarUpdateSchema);

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

module.exports = router;

const express = require("express");
const { authenticate } = require("../../middlewares");
const router = express.Router();
const ctrl = require("../../controllers/user");

router.get("/", authenticate, ctrl.getUser);
router.patch("/avatar", authenticate, ctrl.updateAvatar);
router.patch("/", authenticate, ctrl.updateUserInfo);
module.exports = router;

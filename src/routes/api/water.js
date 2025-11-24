const express = require("express");
const { authenticate } = require("../../middlewares");
const { addConsumedWater } = require("../../controllers/water");
const router = express.Router();

router.get("/", authenticate);
router.post("/", authenticate, addConsumedWater);
router.patch("/", authenticate);
router.delete("/", authenticate);
module.exports = router;

const express = require("express");
const { authenticate, isValid } = require("../../middlewares");
const ctrl = require("../../controllers/water");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/water");
const router = express.Router();

const validateWater = validateBody(schemas.waterRecordSchema);
const validateWaterUpdate = validateBody(schemas.updateWaterRecordSchema);

router.use(authenticate);

// router.get("/", ctrl.getAll);
router.post("/", validateWater, ctrl.addConsumedWater);
router.put("/:id", isValid, validateWaterUpdate, ctrl.updateByID);
router.delete("/:id", isValid, ctrl.deleteSign);
router.get("/today", ctrl.usedWaterByToday);
router.get("/month", ctrl.usedWaterByMonth);

module.exports = router;

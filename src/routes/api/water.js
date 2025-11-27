const express = require("express");
const { authenticate, isValid } = require("../../middlewares");
const ctrl = require("../../controllers/water");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/water");
const router = express.Router();

const validateWater = validateBody(schemas.waterRecordSchema);
const validateWaterUpdate = validateBody(schemas.updateWaterRecordSchema);

router.get("/", authenticate, ctrl.getAll);
router.post("/", authenticate, validateWater, ctrl.addConsumedWater);
router.put("/:id", authenticate, isValid, validateWaterUpdate, ctrl.updateByID);
router.delete("/:id", authenticate, isValid, ctrl.deleteSign);
router.get("/:id", isValid, ctrl.usedWaterByToday);
router.get("/month/:id", isValid, ctrl.usedWaterByMonth);

module.exports = router;

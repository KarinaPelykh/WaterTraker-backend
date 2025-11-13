const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/auth");

// router.post("/register", validateBody(schemas), ctrl.REGISTER);

module.exports = router;

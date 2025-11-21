const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/users");

const signupValidateMiddleware = validateBody(schemas.userSignupSchema);
const signinValidateMiddleware = validateBody(schemas.userSigninSchema);

router.post("/signup", signupValidateMiddleware);

module.exports = router;

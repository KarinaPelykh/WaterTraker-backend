const { HttpError } = require("../helpers");
const swaggerUI = require("swagger-ui-express");
const fs = require("node:fs");
const SWAGGER_PATH = require("../constants/swagger");

const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) => next(HttpError(500, "Can't load swagger docs"));
  }
};

module.exports = swaggerDocs;

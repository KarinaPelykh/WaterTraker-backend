const express = require("express");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const fs = require("fs/promises");

const authRouter = require("./src/routes/api/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YY_hh:mm:ss");

  await fs.appendFile("./server.log", `\n${method} ${url} ${data}`);
  next();
});

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;

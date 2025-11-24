const express = require("express");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const fs = require("fs/promises");

const authRouter = require("./src/routes/api/auth");
const userRouter = require("./src/routes/api/user");
const waterRouter = require("./src/routes/api/water");

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
app.use("/api/user", userRouter);
app.use("/api/water", waterRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;

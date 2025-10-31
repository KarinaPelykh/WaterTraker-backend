const express = require("express");
const cors = require("cors");
const moment = require("moment");

require("domain").config();

const fs = require("fs/promises");

const authRouter = require("./src/routes/api/auth");
const userRouter = require("./src/routes/api/user");

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(cors());

app.use((req, res, next) => {
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YY_hh:mm:ss");

  await fs.appendFile("./server.log", `\n${method} ${url} ${data}`);
  next();
});

app.use((req, res) => {
  res.status(404).json({ massage: "Not found" });
});

module.exports = app;

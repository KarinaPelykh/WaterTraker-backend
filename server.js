const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log("server is running");
});

app.use(cors());

app.use((req, res, next) => {
  console.log("middleware");

  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

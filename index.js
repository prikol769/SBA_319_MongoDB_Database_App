const express = require("express");
const conn = require("./db/conn");
const app = express();
require("dotenv").config();

const setupRoute = require("./routes/setup.route");

const PORT = process.env.PORT;

conn();

app.use("/setup", setupRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const express = require("express");
const conn = require("./db/conn");
const app = express();
const PORT = process.env.PORT;

require("dotenv").config();

conn();

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

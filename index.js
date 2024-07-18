const express = require("express");
const conn = require("./db/conn");
const app = express();
require("dotenv").config();

const User = require("./models/user.model");
const setupUsers = require("./db/setupUsers");

const PORT = process.env.PORT;

conn();

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/setup/users", async (req, res) => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.create(setupUsers);
    res.json(createdUsers);
  } catch (error) {
    console.log(
      `Something went wrong with connect to the database ${error.message}`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

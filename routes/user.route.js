const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.id);
    res.json(oneUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

router.post("/", async (req, res) => {
  try {
    const isUsernameExists = await User.find({ username: req.body.username });

    if (isUsernameExists.length > 0) {
      res.json({
        error: `User with ${req.body.username} username already exists`,
      });
      return;
    }
    const isEmailExists = await User.find({ email: req.body.email });

    if (isEmailExists.length > 0) {
      res.json({
        error: `User with ${req.body.email} email already exists`,
      });
      return;
    }

    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error create user" });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body);
//     res.json(updatedFruit);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error update fruit" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
//     res.json(deletedFruit);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error delete fruit" });
//   }
// });
module.exports = router;

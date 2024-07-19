const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");

router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find({});
    res.json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const oneUser = await User.findById(req.params.id);
//     res.json(oneUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching user" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const isUsernameExists = await User.find({ username: req.body.username });

//     if (isUsernameExists.length > 0) {
//       res.status(409).json({
//         error: `User with ${req.body.username} username already exists`,
//       });
//       return;
//     }
//     const isEmailExists = await User.find({ email: req.body.email });

//     if (isEmailExists.length > 0) {
//       res.status(409).json({
//         error: `User with ${req.body.email} email already exists`,
//       });
//       return;
//     }

//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error create user" });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error update user" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     res.json(deletedUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error delete user" });
//   }
// });

module.exports = router;

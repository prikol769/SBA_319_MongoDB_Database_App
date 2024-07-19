const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");

router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find({});
    res.json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneComment = await Comment.findById(req.params.id);
    res.json(oneComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching comment" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error create comment" });
  }
});

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

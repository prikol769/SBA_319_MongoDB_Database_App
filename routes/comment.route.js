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

router.put("/:commentId/:userId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (comment.userId !== req.params.userId) {
      res
        .status(403)
        .json({ message: "You are not allowed to update this comment" });
      return;
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error update comment" });
  }
});

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

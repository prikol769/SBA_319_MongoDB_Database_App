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

router.delete("/:commentId/:userId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (comment.userId !== req.params.userId) {
      res
        .status(403)
        .json({ message: "You are not allowed to delete this comment" });
      return;
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "The comment has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error delete comment" });
  }
});

module.exports = router;

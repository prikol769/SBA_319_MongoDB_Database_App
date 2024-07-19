const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//Get Posts by user id
router.get("/:userId", async (req, res) => {
  try {
    const userPosts = await Post.find({ userId: req.params.userId });

    if (userPosts.length <= 0) {
      res.json({ message: "Current user doesnt have posts!" });
      return;
    }
    res.json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

//Get Post by post id
router.get("/:postId", async (req, res) => {
  try {
    const onePost = await Post.findById(req.params.postId);
    res.json(onePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      res.status(500).json({ message: "Please provide all required fields" });
      return;
    }

    const isUserIdExist = await User.findById(req.body.userId);
    if (!isUserIdExist) {
      res.status(500).json({ message: "Please provide existing user" });
      return;
    }
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error create post" });
  }
});

router.put("/:postId/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId !== req.params.userId) {
      res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
      return;
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error update post" });
  }
});

router.delete("/:postId/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId !== req.params.userId) {
      res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
      return;
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "The post has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error delete post" });
  }
});

module.exports = router;

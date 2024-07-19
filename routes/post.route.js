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

router.get("/:id", async (req, res) => {
  try {
    const onePost = await Post.findById(req.params.id);
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

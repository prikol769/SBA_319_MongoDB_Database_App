const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const setupUsers = require("../db/setupUsers");
const setupPosts = require("../db/setupPosts");
const setupComments = require("../db/setupComments");

router.get("/users", async (req, res) => {
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

router.get("/posts", async (req, res) => {
  try {
    await Post.deleteMany({});
    const users = await User.find({}).select("_id");

    if (users.length < 7) {
      res.json({ error: "You need more than 7 users" });
      return;
    }

    const postsWithUserId = setupPosts.map((post, i) => ({
      ...post,
      userId: users[i]._id,
    }));

    const createdPosts = await Post.create(postsWithUserId);
    res.json(createdPosts);
  } catch (error) {
    console.log(
      `Something went wrong with connect to the database ${error.message}`
    );
  }
});

router.get("/comments", async (req, res) => {
  try {
    await Comment.deleteMany({});
    const users = await User.find({}).select("_id");
    const posts = await Post.find({}).select("_id");

    if (users.length < 6) {
      res.json({ error: "You need more than 6 users" });
      return;
    }

    if (posts.length < 6) {
      res.json({ error: "You need more than 6 posts" });
      return;
    }

    const commentsWithUserIdAndPostId = setupComments.map((comment, i) => ({
      ...comment,
      userId: users[i]._id,
      postId: posts[i]._id,
    }));

    const createdComments = await Comment.create(commentsWithUserIdAndPostId);
    res.json(createdComments);
  } catch (error) {
    console.log(
      `Something went wrong with connect to the database ${error.message}`
    );
  }
});

module.exports = router;

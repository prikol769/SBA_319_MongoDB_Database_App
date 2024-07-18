const express = require("express");
const conn = require("./db/conn");
const app = express();
require("dotenv").config();

const User = require("./models/user.model");
const Post = require("./models/post.model");
const setupUsers = require("./db/setupUsers");
const setupPosts = require("./db/setupPosts");
const setupComments = require("./db/setupPosts");

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

app.get("/setup/posts", async (req, res) => {
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

app.get("/setup/comments", async (req, res) => {
  try {
    await Post.deleteMany({});
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

    const commentsWithUserIdAndPostId = setupPosts.map((comment, i) => ({
      ...comment,
      userId: users[i]._id,
      postId: posts[i]._id,
    }));

    const createdComments = await Post.create(commentsWithUserIdAndPostId);
    res.json(createdComments);
  } catch (error) {
    console.log(
      `Something went wrong with connect to the database ${error.message}`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

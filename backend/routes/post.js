const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  singlePost
} = require("../controllers/post");
const { createPostValidator } = require("../validation/index");
const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.param("userId", userById);
router.param("postId", postById);
module.exports = router;

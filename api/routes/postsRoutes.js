import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../../controllers/postsControllers.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:post_id", getPost);
router.post("/", createPost);
router.patch("/:post_id", updatePost);
router.delete("/:post_id", deletePost);

export default router;

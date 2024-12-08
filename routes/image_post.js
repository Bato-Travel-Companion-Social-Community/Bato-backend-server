import { Router } from "express";
import {
  getImagePosts,
  addPost,
  likeTestPost,
  addComment,
  getComments,
} from "../controllers/index.js";
import multer from "multer"; // Multer to handle file uploads

const postRouter = Router();

// Multer setup to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage to store files in buffer
const upload = multer({ storage: storage });

postRouter.get("/get_image_posts", getImagePosts);
postRouter.post("/add_image_post", upload.array("images[]"), addPost);
postRouter.post("/test_post/:postId/like", likeTestPost);
postRouter.post("/test_post/:postId/comment", addComment);
postRouter.get("/test_post/:postId/comments", getComments);

export default postRouter;

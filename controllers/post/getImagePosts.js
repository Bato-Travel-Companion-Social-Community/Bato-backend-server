import "dotenv/config.js";
import { imagePostModel } from "../../models/index.js";
import jwt from "jsonwebtoken";

// In your getImagePosts controller
const getImagePosts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    const posts = await imagePostModel
      .find()
      .populate("ownerId", "_id display_name avatar")
      .populate("likes", "_id display_name avatar")
      .populate("comments.user", "_id display_name avatar")
      .lean()
      .exec();

    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLiked: post.likes.some(
        (like) => like._id.toString() === userId.toString()
      ),
      likeCount: post.likes.length,
      commentCount: post.comments?.length || 0,
    }));

    res.json(postsWithLikeStatus);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getImagePosts;

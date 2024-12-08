import jwt from "jsonwebtoken";
import { imageTestPostModel } from "../../models/index.js";

const likeTestPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId;
    const post = await imageTestPostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likeCount--;
    } else {
      // Like
      post.likes.push(userId);
      post.likeCount++;
    }

    await post.save();

    // Fetch the updated post with populated likes
    const updatedPost = await imageTestPostModel
      .findById(postId)
      .populate("likes", "_id display_name avatar")
      .lean();

    res.json({
      likes: updatedPost.likes,
      likeCount: updatedPost.likeCount,
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default likeTestPost;

import jwt from "jsonwebtoken";
import { imageTestPostModel } from "../../models/index.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    const post = await imageTestPostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: userId,
      text: text,
    });
    post.commentCount = post.comments.length;
    await post.save();

    // Get the newly added comment with populated user
    const updatedPost = await imageTestPostModel
      .findById(postId)
      .populate("comments.user", "_id display_name avatar");

    const newComment = updatedPost.comments[updatedPost.comments.length - 1];

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addComment;

// controllers/post/getComments.js
import { imagePostModel } from "../../models/index.js";

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await imagePostModel
      .findById(postId)
      .populate("comments.user", "_id display_name avatar")
      .select("comments");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post.comments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getComments;

import { uploadToCloudinary } from "../../APIs/index.js";
import { imagePostModel } from "../../models/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
/**
 * Endpoint to add a post with images.
 * @route POST /api/post/add_image_post
 * @body { caption, location, images[] }
 */
const addPost = async (req, res) => {
  try {
    const { caption, location } = req.body;
    const files = req.files; // Array of uploaded image files
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization token is required" });
    }

    // Decode the token to get the ownerId (user's ID)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'YOUR_SECRET_KEY' with your actual secret key
      console.log("Decoded Token:", decoded); // Log decoded token to verify its content
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const ownerId = decoded.userId; // Extract the user ID (or ownerId) from the decoded token
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID not found in token" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of files) {
      const imageUrl = await uploadToCloudinary(file.buffer); // Upload the file buffer to Cloudinary
      imageUrls.push(imageUrl); // Store the Cloudinary URL
    }

    // Create the new image post in the database
    const newPost = new imagePostModel({
      images: imageUrls, // Store the Cloudinary image URLs
      caption,
      location,
      ownerId, // Use the ownerId from the token
    });

    await newPost.save();

    res.status(200).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addPost;

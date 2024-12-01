/**
 * Endpoint to add a post with images.
 * @route POST /api/post/add_image_post
 * @body { caption, location, images[] }
 */
const addPost = async (req, res) => {
    try {
      const { caption, location, ownerId } = req.body;
      const files = req.files;  // Array of uploaded image files
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
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
        ownerId,
      });
  
      await newPost.save();
  
      res.status(200).json({ message: 'Post added successfully', post: newPost });
    } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export default addPost;
import 'dotenv/config.js';
import { imagePostModel } from '../../models/index.js'; 

const getImagePosts = async (req, res) => {
    try {
        // Fetch image posts and populate 'ownerId' with 'display_name' and 'avatar'
        const imagePosts = await imagePostModel
            .find()
            .populate('ownerId', 'display_name avatar') // Only fetch required fields from owner
            .lean(); // Convert to plain JavaScript objects for better performance

        // Return the list of posts
        res.status(200).json(imagePosts);
    } catch (error) {
        console.error("Error during getting image posts:", error);
        res.status(500).json({
            message: 'Error retrieving image posts',
            error: error.message,
        });
    }
};
export default getImagePosts;

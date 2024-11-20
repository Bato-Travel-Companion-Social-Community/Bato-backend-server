import 'dotenv/config.js';
import { imagePostModel } from '../../models/index.js'; 

const getImagePosts = async (req, res) => {
    try {
        const imagePosts = await imagePostModel
            .find()
            .populate('ownerId', 'display_name avatar'); // Fetch only username and avatar from User model
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

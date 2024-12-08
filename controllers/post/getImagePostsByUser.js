import 'dotenv/config.js';
import { imagePostModel } from '../../models/index.js';
import jwt from 'jsonwebtoken';  // Add this to handle JWT token decoding

const getImagePostsByUser = async (req, res) => {
    try {
        let { userId } = req.params; // Get userId from route parameters

        // If no userId is provided in the URL, extract it from the token
        if (!userId) {
            const authHeader = req.headers['authorization'];  // Get Authorization header
            if (!authHeader) {
                return res.status(400).json({ message: 'Authorization token required' });
            }

            const token = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"

            if (!token) {
                return res.status(400).json({ message: 'Token missing in Authorization header' });
            }

            // Decode the JWT token to extract the userId
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use your JWT secret here
                userId = decoded.userId;  // Assuming your token contains 'userId' field
            } catch (error) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
        }

        // Now we have a valid userId (either from the URL or decoded from the token)
        // Fetch image posts for a specific user and populate 'ownerId' with 'display_name' and 'avatar'
        const imagePosts = await imagePostModel
            .find({ ownerId: userId })  // Filter by userId
            .populate('ownerId', 'display_name avatar')  // Only fetch required fields from owner
            .lean();  // Convert to plain JavaScript objects for better performance

        // Return the list of posts
        res.status(200).json(imagePosts);
    } catch (error) {
        console.error("Error during getting image posts by user:", error);
        res.status(500).json({
            message: 'Error retrieving image posts',
            error: error.message,
        });
    }
};

export default getImagePostsByUser;

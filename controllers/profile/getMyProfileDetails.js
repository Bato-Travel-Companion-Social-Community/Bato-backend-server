import 'dotenv/config.js';
import { userModel } from '../../models/index.js';

const getMyProfileDetails = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'Authorization token is required' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("Decoded Token:", decoded);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found in token' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default getMyProfileDetails;
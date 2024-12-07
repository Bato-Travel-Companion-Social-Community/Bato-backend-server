import jwt from 'jsonwebtoken';
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
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.userId;
        const user = await userModel.findById(userId).select('display_name avatar');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user); // Send only the needed user data
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default getMyProfileDetails;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import {userModel} from '../../models/index.js'; 

const signup = async (req, res) => {
    const { display_name, username, email, password } = req.body;

    try {
        // Check if email or username already exists
        const existingEmail = await userModel.findOne({ email });
        const existingUsername = await userModel.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hashing the password
        const passwordHash = bcrypt.hashSync(password, 10);

        // Creating a new user
        const user = new userModel({ display_name, username, email, password: passwordHash });
        await user.save(); // Saving the user document in the database

        // Creating a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Send the token back to the client along with the user information if needed
        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default signup;

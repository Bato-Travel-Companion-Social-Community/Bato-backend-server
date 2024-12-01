// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if configuration was successful
if (cloudinary.config().cloud_name) {
    console.log('Cloudinary configured successfully');
} else {
    console.error('Error configuring Cloudinary');
}

// Export the Cloudinary instance
export default cloudinary;

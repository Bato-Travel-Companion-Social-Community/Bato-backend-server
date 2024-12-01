import cloudinary from './cloudinary_config.js';
import { createReadStream } from 'streamifier';

/**
 * Upload an image buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The buffer of the image file to upload.
 * @param {Object} options - Options for the upload (e.g., folder, public_id).
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export async function uploadToCloudinary(fileBuffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options, 
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url); // Return the URL of the uploaded image
      }
    );

    // Stream the buffer to Cloudinary
    createReadStream(fileBuffer).pipe(uploadStream);
  });
}

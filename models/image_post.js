import mongoose from 'mongoose';

const imagePostSchema = new mongoose.Schema({
    images: {
        type: [String], // Corrected type to represent an array of strings
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

const imagePostModel = mongoose.model('PostImage', imagePostSchema);

export default imagePostModel;

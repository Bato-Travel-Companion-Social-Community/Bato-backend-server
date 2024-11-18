import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    display_name : {
        type: String,
        required: true
    },
    avatar : {
        type: String,
        required: false
    },
    bio : {
        type: String,
        required: false
    },

}, {timestamps: true}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
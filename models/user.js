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
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true,
        default: 'user'
    },
    avatar: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
export default User;
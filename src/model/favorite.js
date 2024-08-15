import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    word: {
        type: String,
        ref: 'Vocabulary',
        required: true
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
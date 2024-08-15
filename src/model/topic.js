import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
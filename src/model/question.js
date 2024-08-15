import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    answers: {
        type: [answerSchema],
        validate: [arrayLimit, '{PATH} phải có đúng 4 câu trả lời']
    }
});

function arrayLimit(val) {
    return val.length === 4;
}

const Question = mongoose.model('Question', questionSchema);
export default Question;
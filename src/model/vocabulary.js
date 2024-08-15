import mongoose  from "mongoose";

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        require: true,
        unique: true
    },
    mean: {
        type: String, // ý nghĩa
        require: true
    },
    type: {
        type: String, // Động từ, Danh từ, Tính từ, Trạng từ,...
    },
    example: {
        type: String, // ví dụ
    },
    pronunciation: {
        type: String, // phát âm
    },
    topic: {
        type: String,
    }
});

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
export default Vocabulary;

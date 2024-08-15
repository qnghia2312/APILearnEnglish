import Question from '../model/question.js';

// Api lấy câu hỏi theo chủ đề
export const getQuestionsByTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        const questions = await Question.find({ topic });

        if (!questions.length) {
            return res.status(200).json({status: 404, message: "Không tìm thấy câu hỏi nào cho chủ đề này" });
        }

        res.status(200).json({status: 200, message: "Lấy câu hỏi thành công", data: questions});
    } catch (error) {
        console.error("Lỗi khi lấy danh sách câu hỏi theo chủ đề:", error);
        res.status(200).json({status: 500, message: "Lỗi khi lấy danh sách câu hỏi theo chủ đề" });
    }
};

// Api thêm câu hỏi
export const addQuestion = async (req, res) => {
    try {
        const { questionText, topic, answers } = req.body;

        // Kiểm tra xem có đủ 4 câu trả lời và đúng 1 câu trả lời đúng hay không
        if (answers.length !== 4) {
            return res.status(200).json({status: 400, message: 'Phải có đúng 4 câu trả lời.' });
        }

        const correctAnswersCount = answers.filter(answer => answer.isCorrect).length;
        if (correctAnswersCount !== 1) {
            return res.status(200).json({status: 400, message: 'Phải có đúng 1 câu trả lời đúng.' });
        }

        if (!topic) {
            return res.status(200).json({status: 400, message: 'Phải có chủ đề cho câu hỏi này.' });
        }

        // Tạo câu hỏi mới
        const newQuestion = new Question({ questionText, topic, answers });
        const savedQuestion = await newQuestion.save();

        res.status(200).json({status: 200, message: 'Thêm câu hỏi mới thành công.', data: savedQuestion });
    } catch (error) {
        console.error('Lỗi thêm câu hỏi:', error);
        res.status(200).json({status: 500, message: 'Lỗi thêm câu hỏi' });
    }
};

// Api sửa câu hỏi
export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionText, topic, answers } = req.body;

        // Kiểm tra xem có đủ 4 câu trả lời và đúng 1 câu trả lời đúng hay không
        if (answers.length !== 4) {
            return res.status(200).json({status: 400, message: 'Phải có đúng 4 câu trả lời.' });
        }

        const correctAnswersCount = answers.filter(answer => answer.isCorrect).length;
        if (correctAnswersCount !== 1) {
            return res.status(200).json({status: 400, message: 'Phải có đúng 1 câu trả lời đúng.' });
        }

        if (!topic) {
            return res.status(200).json({status: 400, message: 'Phải có chủ đề cho câu hỏi này.' });
        }

        // Tìm và sửa câu hỏi theo ID
        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { questionText, topic, answers },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy câu hỏi này' });
        }

        res.status(200).json({status: 200, message: 'Sửa câu hỏi thành công.', data: updatedQuestion });
    } catch (error) {
        console.error('Lỗi sửa câu hỏi:', error);
        res.status(200).json({status: 500, message: 'Lỗi sửa câu hỏi' });
    }
};

// Api xóa câu hỏi
export const deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm và xóa câu hỏi theo ID
        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(200).json({status: 404, message: "Không tìm thấy câu hỏi này" });
        }

        res.status(200).json({status: 200, message: "Xóa câu hỏi thành công.", data: deletedQuestion });
    } catch (error) {
        console.error("Lỗi khi xóa câu hỏi:", error);
        res.status(200).json({status: 500, message: "Lỗi khi xóa câu hỏi" });
    }
};
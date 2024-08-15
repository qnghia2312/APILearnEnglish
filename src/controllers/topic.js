import Topic from '../model/topic';
import Vocabulary from '../model/vocabulary';

// API lấy danh sách tất cả các topic
export const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();

        if (topics.length === 0) {
            return res.status(200).json({status: 404, message: "Không tìm thấy topic nào" });
        }

        res.status(200).json({status: 200, message: "Lấy danh sách topic thành công.", data: topics });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách topic:", error);
        res.status(200).json({status: 500, message: "Lỗi khi lấy danh sách topic" });
    }
};

// API lấy danh sách vocabulary theo topic
export const getVocabularyByTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        const listVocabulary = await Vocabulary.find({ topic }) ;

        if (listVocabulary.length === 0) {
            return res.status(200).json({status: 404, message: "Không tìm thấy từ vựng nào thuộc chủ đề " + topic });
        }

        res.status(200).json({status: 200, message: "Lấy danh sách từ vựng theo chủ đề thành công.", data: listVocabulary });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách từ vựng theo topic:", error);
        res.status(200).json({status: 500, message: "Lỗi khi lấy danh sách từ vựng theo topic" });
    }
};

// API thêm topic
export const addTopic = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Kiểm tra topic đã tồn tại chưa
        const existingTopic = await Topic.findOne({ name });
        if (existingTopic) {
            return res.status(200).json({status: 400, message: "Topic này đã tồn tại" });
        }

        if (!name || !description) {
            return res.status(200).json({status: 400, message: "Không được để trống bất cứ thông tin nào" });
        }

        // Tạo topic mới
        const newTopic = new Topic({ name, description });
        const savedTopic = await newTopic.save();

        res.status(200).json({status: 200, message: "Thêm topic mới thành công.", data: savedTopic });
    } catch (error) {
        console.error("Lỗi thêm topic:", error);
        res.status(200).json({status: 500, message: "Lỗi thêm topic" });
    }
};

// API sửa topic
export const updateTopicByName = async (req, res) => {
    try {
        const { name } = req.query;
        const { newName, description } = req.body;

        if (!newName || !description) {
            return res.status(200).json({status: 400, message: "Không được để trống bất cứ thông tin nào" });
        }

        // Tìm và sửa topic theo tên
        const updatedTopic = await Topic.findOneAndUpdate(
            { name },
            { name: newName, description },
            { new: true }
        );

        if (!updatedTopic) {
            return res.status(200).json({status: 404, message: "Không tìm thấy topic này" });
        }

        res.status(200).json({status: 200, message: "Sửa topic thành công.", data: updatedTopic });
    } catch (error) {
        console.error("Lỗi sửa topic:", error);
        res.status(200).json({status: 500, message: "Lỗi sửa topic" });
    }
};

// API xóa topic
export const deleteTopicByName = async (req, res) => {
    try {
        const { name } = req.query;

        // Tìm và xóa topic theo tên
        const deletedTopic = await Topic.findOneAndDelete({ name });

        if (!deletedTopic) {
            return res.status(200).json({status: 404, message: "Không tìm thấy topic này" });
        }

        res.status(200).json({status: 200, message: "Xóa topic thành công.", data: deletedTopic });
    } catch (error) {
        console.error("Lỗi khi xóa topic:", error);
        res.status(200).json({status: 500, message: "Lỗi khi xóa topic" });
    }
};


import Vocabulary from '../model/vocabulary';
import Favorite from '../model/favorite';

//API lấy danh sách vocabulary
export const getVocabulary = async (req, res) => {
    try {
        const vocabularies = await Vocabulary.find().sort({ word: 1 }); // Lấy tất cả các documents từ collection Vocabulary, sắp xếp

        if (vocabularies.length === 0) {
            return res.status(200).json({status: 404, message: "Không tìm thấy từ vựng nào" });
        }

        res.status(200).json({status: 200, message: 'Lấy danh sách từ vựng thành công.', data: vocabularies}); // Trả về danh sách các documents dưới dạng JSON
        //console.log("vocabularies");
    } catch (error) {
        console.error("Lỗi khi lấy từ vựng:", error);
        res.status(200).json({status: 500, message: "Internal Server Error" });
    }
}

//API lấy các vocabulary có word = từ truyền vào
export const getVocabularyByWord = async (req, res) => {
    try {
        const { word } = req.query; // Lấy word từ query string
        if (!word) {
            return res.status(200).json({status: 400, message: "Hãy nhập từ vựng để tìm kiếm" });
        }

        const regex = new RegExp(word, 'i'); // 'i' để không phân biệt chữ hoa chữ thường
        const vocabularyEntries = await Vocabulary.find({
            $or: [                      // tìm theo word hoặc theo mean
                { word: regex },
                { mean: regex }
            ]
        }).sort({ word: 1 }); //sắp xếp theo word

        if (vocabularyEntries.length === 0) {
            return res.status(200).json({status: 404, message: "Không tìm thấy từ vựng nào" });
        }

        res.status(200).json({status: 200, message: "Tìm từ vựng thành công", data: vocabularyEntries});
    } catch (error) {
        console.error("Lỗi khi tìm từ vựng:", error);
        res.status(200).json({status: 500, message: "Lỗi khi tìm từ vựng" });
    }
}

//API thêm vocabulary
export const addVocabulary = async (req, res) => {
    try {
        const { word, mean, type, example, pronunciation, topic } = req.body;

        // Kiểm tra từ vựng đã tồn tại chưa
        const existingEntry = await Vocabulary.findOne({ word });
        if (existingEntry) {
            return res.status(200).json({status: 400, message: "Từ vựng này đã tồn tại" });
        }

        // Kiểm tra có bỏ trống thông tin cần thiết nào không
        if (!word || !mean || !topic) {
            return res.status(200).json({status: 400, message: "Vui lòng điền đầy đủ các thông tin bắt buộc." });
        }

        // Tạo từ vựng mới
        const newEntry = new Vocabulary({ word, mean, type, example, pronunciation, topic  });
        const savedEntry = await newEntry.save();

        res.status(200).json({status: 200, message: "Thêm từ vựng mới thành công.", data: savedEntry});
    } catch (error) {
        console.error("Lỗi thêm từ vựng:", error);
        res.status(200).json({status: 500, message: "Lỗi thêm từ vựng" });
    }
}

//API sửa vocabulary
export const updateVocabulary = async (req, res) => {
    try {
        const { oldWord } = req.params;
        const { word, mean, type, example, pronunciation, topic } = req.body;

        // Kiểm tra có bỏ trống thông tin cần thiết nào không
        if (!word || !mean || !topic) {
            return res.status(200).json({status: 400, message: "Vui lòng điền đầy đủ các thông tin bắt buộc." });
        }

        // Tìm và sửa từ vựng theo oldWord
        const updatedEntry = await Vocabulary.findOneAndUpdate(
            { word: oldWord },
            { word, mean, type, example, pronunciation, topic },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(200).json({status: 404, message: "Không tìm thấy từ vựng này" });
        }

        res.status(200).json({status: 200, message: "Sửa từ vựng thành công.", data: updatedEntry});
    } catch (error) {
        console.error("Lỗi sửa từ vựng:", error);
        res.status(200).json({status: 500, message: "Lỗi sửa từ vựng" });
    }
}

//API xóa vocabulary
export const deleteVocabulary = async (req, res) => {
    try {
        const { word } = req.query;
        if (!word) {
            return res.status(200).json({status: 400, message: "Thiếu tham số word" });
        }

        const deletedEntry = await Vocabulary.findOneAndDelete({ word });

        if (!deletedEntry) {
            return res.status(200).json({status: 404, message: "Không tìm thấy từ vựng để xóa" });
        }

        const deletedFavorites = await Favorite.deleteMany({ word });

        res.status(200).json({status: 200, message: "Đã xóa từ vựng thành công", data: deletedEntry });
    } catch (error) {
        console.error("Lỗi khi xóa từ vựng:", error);
        res.status(200).json({status: 500, message: "Lỗi khi xóa từ vựng" });
    }
}
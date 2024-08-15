import Favorite from '../model/favorite.js';
import User from '../model/user.js';
import Vocabulary from '../model/vocabulary.js';

// Thêm favorite
export const addFavorite = async (req, res) => {
    try {
        const { username, word } = req.body;

        // Kiểm tra xem các trường có bị trống hay không
        if (!username || !word) {
            return res.status(200).json({status: 400, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        // Kiểm tra sự tồn tại của username trong collection User
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({status: 404, message: 'Username không tồn tại.' });
        }

        // Kiểm tra sự tồn tại của word trong collection Vocabulary
        const vocabulary = await Vocabulary.findOne({ word });
        if (!vocabulary) {
            return res.status(200).json({status: 404, message: 'Từ này không tồn tại.' });
        }

        // Kiểm tra xem đã có từ này trong favorte hay chưa
        const existingFavorite = await Favorite.findOne({ username, word });
        if (existingFavorite) {
            return res.status(200).json({status: 409, message: 'Đã có từ này trong mục yêu thích.' });
        }

        // Tạo favorite mới
        const newFavorite = new Favorite({ username, word });
        await newFavorite.save();

        res.status(200).json({status: 200, message: 'Đã thêm vào mục yêu thích thành công.', data: newFavorite });
    } catch (error) {
        console.error('Lỗi khi thêm yêu thích:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi thêm yêu thích' });
    }
};

// Xóa favorite
export const deleteFavorite = async (req, res) => {
    try {
        const { username, word } = req.body;

        // Kiểm tra xem các trường có bị trống hay không
        if (!username || !word) {
            return res.status(200).json({status: 400, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        // Xóa favorite
        const deletedFavorite = await Favorite.findOneAndDelete({ username, word });

        if (!deletedFavorite) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy trong yêu thích để xóa.' });
        }

        res.status(200).json({status: 200, message: 'Đã xóa yêu thích thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa yêu thích:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi xóa yêu thích' });
    }
};

// API lấy các vocabulary trong mục yêu thích
export const getFavoritesByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Kiểm tra xem username có được cung cấp hay không
        if (!username) {
            return res.status(200).json({status: 400, message: 'Vui lòng cung cấp username.' });
        }

        // Lấy danh sách từ yêu thích của người dùng
        const favorites = await Favorite.find({ username });
        if (favorites.length === 0) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy từ yêu thích nào.' });
        }

        // Lấy danh sách các từ từ mục yêu thích
        const words = favorites.map(favorite => favorite.word);

        // Lấy danh sách từ vựng tương ứng
        const vocabularies = await Vocabulary.find({ word: { $in: words } });

        res.status(200).json({status: 200, message: 'Lấy các từ yêu thích thành công.', data: vocabularies});
    } catch (error) {
        console.error('Lỗi khi lấy danh sách từ yêu thích:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi lấy danh sách các từ yêu thích' });
    }
};
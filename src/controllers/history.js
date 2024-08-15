import History from '../model/history';

//Lấy lịch sử theo loại(luyện tập hay ôn tập)
export const getHistoryByType = async (req, res) => {
    try {
        const { username, type } = req.query;

        if (!username || !type) {
            return res.status(200).json({ status: 400, message: "Cần phải có username và loại" });
        }

        const historyEntries = await History.find({ username, type }).sort({ date: -1 });

        if (historyEntries.length === 0) {
            return res.status(200).json({ status: 404, message: "Bạn chưa có lịch sử của phần này" });
        }

        res.status(200).json({ status: 200, message: "Lấy lịch sử thành công", data: historyEntries });
    } catch (error) {
        console.error("Error retrieving history:", error);
        res.status(200).json({ status: 500, message: "Lỗi khi lấy lịch sử" });
    }
}

//Thêm lịch sử
export const addHistory = async (req, res) => {
    try {
        const { username, type, content, result } = req.body;

        if (!username || !type || !content || !result) {
            return res.status(200).json({ status: 400, message: "Tất cả thông tin không được trống" });
        }

        const newHistory = new History({
            username,
            type,
            content,
            result
        });

        await newHistory.save();

        res.status(200).json({ status: 200, message: "Lưu lịch sử thành công", data: newHistory });
    } catch (error) {
        console.error("Lỗi lưu lịch sử", error);
        res.status(200).json({ status: 500, message: "Lỗi lưu lịch sử" });
    }
}
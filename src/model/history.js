import mongoose from 'mongoose';

const historySchema =  new mongoose.Schema({
    username: {     //lịch sử của tài khoản nào
        type: String,
        ref: 'User',
        required: true
    },
    type: {         //Ôn tập hay luyện tập
        type: String,
        required: true,
        default: 'Luyện tập'   
    },
    content: {
        type: String, 
        required: true
    },
    result: {       //Kết quả kiểm tra
        type: String, 
        required: true
    },
    date: {         //Thời gian
        type: Date,
        default: Date.now, //set mặc định là thời gian hiện tại
        required: true
    }
});

const History = mongoose.model('History', historySchema);
export default History;
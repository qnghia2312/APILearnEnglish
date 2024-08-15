import User from '../model/user.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// API lấy danh sách user đang hoạt động
export const getActiveUsers = async (req, res) => {
    try {
        const users = await User.find({ status: true });
        res.status(200).json({status: 200, message: 'Lấy danh sách user thành công.', data: users });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách user đang hoạt động:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi lấy danh sách user đang hoạt động' });
    }
};

// API lấy danh sách user không hoạt động
export const getInactiveUsers = async (req, res) => {
    try {
        const users = await User.find({ status: false });
        res.status(200).json({status: 200, message: 'Lấy danh sách user thành công.', data: users });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách user không hoạt động:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi lấy danh sách user không hoạt động' });
    }
};

// API tạo user mới
export const createUser = async (req, res) => {
    try {
        const { username, password, name, email } = req.body;

        // Kiểm tra xem các trường có bị trống hay không
        if (!username || !password || !name || !email) {
            return res.status(200).json({status: 400, message: 'Vui lòng điền đầy đủ thông tin.' });
        }

        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(200).json({status: 400, message: 'Username đã tồn tại.' });
        }

        const newUser = new User({ username, password, name, email });
        await newUser.save();

        res.status(200).json({status: 200, message: 'Tạo user thành công.', data: newUser });
    } catch (error) {
        console.error('Lỗi khi tạo user:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi tạo user' });
    }
};

//API login
export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra xem các trường có bị trống hay không
        if (!username || !password) {
            return res.status(200).json({status: 400, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        // Tìm người dùng theo username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy username này.' });
        }

        // Kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(200).json({status: 401, message: 'Mật khẩu không đúng.' });
        }

        // Kiểm tra trạng thái
        if (user.status == false) {
            return res.status(200).json({status: 401, message: 'Tài khoản này đã bị khóa.' });
        }

        res.status(200).json({status: 200, message: 'Đăng nhập thành công.', data: user});
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi đăng nhập' });
    }
};

// API lấy user theo username
export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy user' });
        }

        res.status(200).json({status: 200, message: 'Lấy user thành công.', data: user});
    } catch (error) {
        console.error('Lỗi khi lấy user theo username:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi lấy user theo username' });
    }
};

// API đổi mật khẩu
export const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy user' });
        }

        if (user.password !== oldPassword) {
            return res.status(200).json({status: 400, message: 'Mật khẩu cũ không đúng' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({status: 200, message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi đổi mật khẩu' });
    }
};

// API sửa thông tin cá nhân 
export const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { email, name, avatar } = req.body;

        const user = await User.findOneAndUpdate({ username }, { email, name, avatar }, { new: true });

        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy user' });
        }

        if (!email || !name) {
            return res.status(200).json({status: 400, message: 'Không được để trống' });
        }

        res.status(200).json({status: 200, message: 'Sửa thông tin cá nhân thành công.', data: user});
    } catch (error) {
        console.error('Lỗi khi sửa thông tin cá nhân:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi sửa thông tin cá nhân' });
    }
};

// API đổi trạng thái
export const changeUserStatus = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy user' });
        }

        user.status = !user.status;
        await user.save();

        res.status(200).json({status: 200, message: 'Đổi trạng thái thành công', data: user});
    } catch (error) {
        console.error('Lỗi khi đổi trạng thái:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi đổi trạng thái' });
    }
};

// API gửi mã khi quên mật khẩu
export const forgotPassword = async(req, res) => {
    try {
        const { username, email } = req.body;

        // Kiểm tra xem các trường có bị trống hay không
        if (!username || !email) {
            return res.status(200).json({status: 400, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        // Tìm người dùng theo username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy username này.' });
        }

        // Kiểm tra email
        if (user.email !== email) {
            return res.status(200).json({status: 401, message: 'Email không chính xác.' });
        }
    
        // Tạo một mã ngẫu nhiên bằng crypto
        const randomCode = crypto.randomBytes(3).toString('hex');

        // Cấu hình nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nguyenquangnghia94.2016@gmail.com', 
                pass: 'kava qrdk bcul cfcv'   
            }
        });
        
        // Tùy chọn email
        let mailOptions = {
            from: 'nguyenquangnghia94.2016@gmail.com', // Thay thế bằng email của bạn
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${randomCode}`
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.error('Lỗi khi gửi email', error);
                return res.status(200).json({status: 500, message: 'Lỗi khi gửi email' });
            } else {
                //console.log('Email đã gửi: ' + info.response);
                res.status(200).json({status: 200, message: 'Đã gửi mã đến email của bạn, vui lòng kiểm tra.', data: randomCode });
            }
        });

    } catch (error) {
        console.error('Lỗi khi quên mật khẩu', error);
        res.status(200).json({status: 500, message: 'Lỗi khi quên mật khẩu' });
    }
}

// API reset mật khẩu
export const resetPassword = async(req, res) => {
    try {
        const { username, newPassword } = req.body;

        if (!username || !newPassword) {
            return res.status(200).json({status: 400, message: 'Không được để trống mật khẩu.' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({status: 404, message: 'Không tìm thấy user' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({status: 200, message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(200).json({status: 500, message: 'Lỗi khi đổi mật khẩu' });
    }

}



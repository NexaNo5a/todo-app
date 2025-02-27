const User = require('../models/User');
const bcrypt = require('bcryptjs');

const verifyPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.user = user; // 将用户数据传递给控制器
        next();
    } catch (err) {
        next(err);
    }
};

const validateAuthInput = (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username)
    console.log(req.path)
    if (!email || !password || (req.path === '/register' && !username)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    next();
};

const checkUserExists = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User exists' });
        }
        next();
    } catch (err) {
        next(err); // 传递错误给错误处理中间件
    }
};

module.exports = {
    verifyPassword,
    validateAuthInput,
    checkUserExists
};
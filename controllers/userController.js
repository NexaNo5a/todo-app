
const { User } = require('../models/User')
const { bcrypt, hash} = require('bcryptjs')
const { jwt } = require('jsonwebtoken')
const registerUser = async (req, res) => {
    const { username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword});
    const newUser = await user.save();
    res.status(201).json(newUser);
}

const loginUser = async (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});
    res.json({
        token,
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
    });
}
module.exports = { registerUser, loginUser}
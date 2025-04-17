const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    // console.log(req.body);
    try {
        const { username, password, role } = req.body;
        console.log(username);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res
            .status(201)
            .json({
                message: 'User Registered Successfully with username: ' + username
            });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Internal Server Error' });
    }
}
const login = async (req, res) => {
    try{
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res
            .status(404)
            .json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(400)
            .json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ id: user._id, username:user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res
        .status(200)
        .json({
            message: 'User logged in successfully',
            token: token
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    login
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { first_name, last_name, email, address, phone_number, username, password } = req.body;
    try {
        const emailExists = await User.checkEmailExists(email);
        const phoneNumberExists = await User.checkPhoneNumberExists(phone_number);
        const usernameExists = await User.checkUsernameExists(username);
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (phoneNumberExists) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.createUser({ first_name, last_name, email, address, phone_number, username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, 'secretkey');
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

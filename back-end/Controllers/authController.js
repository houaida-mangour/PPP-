import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "user already existed" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashpassword
    });
    await newUser.save();
    return res.json({ status: true, message: "record registed" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "user is not registered" }); // 401 Unauthorized
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: "password is incorrect" }); // 401 Unauthorized
    }

    const token = jwt.sign({ userId: user._id}, process.env.KEY, {
        expiresIn: '24h'
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.status(200).json({ status: true, message: "login successfully", userId: user._id, userName: user.username, token: token }); // 200 OK
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ status: true, message: "logout successfully" });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ error: 'Unable to logout' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    }
};


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId); 
        if (!user) { 
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Unable to fetch user' });
    }
};



export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            const hashpassword = await bcrypt.hash(password, 10);
            user.password = hashpassword;
        }

        await user.save();

        return res.status(200).json({ status: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Unable to update user' });
    }
};
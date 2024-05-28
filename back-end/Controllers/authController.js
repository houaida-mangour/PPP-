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
        return res.json({ message: "user is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
        expiresIn: '24h'
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "login successfully", userId: user._id });
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Récupérez tous les utilisateurs depuis la base de données
        res.status(200).json(users); // Renvoyez les utilisateurs récupérés en tant que réponse
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

// Ajoutez ici les autres fonctions de votre contrôleur, comme forgotPassword, resetPassword, etc.

import { Event } from '../models/Events.js';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        console.log(`Received userId: ${userId}`);


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });}
        
        // Find the user by ID and populate the referenced events
        const user = await User.findById(userId)
            .populate('organizerOfEvents')
            .populate('participantInEvents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find()
            .populate('organizerOfEvents')
            .populate('participantInEvents');

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
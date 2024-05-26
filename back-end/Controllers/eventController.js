import { Event } from '../models/Events.js';

// Fonction pour créer un nouvel événement
export const createEvent = async (req, res) => {
    try {
        const { name, description, startDate, endDate, location, participants, imageUrl } = req.body;
        const newEvent = new Event({ name, description, startDate, endDate, location, participants, imageUrl });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create event' });
    }
};

// Fonction pour obtenir tous les événements
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch events' });
    }
};

import { Event } from '../models/Events.js';
import { User } from '../models/User.js';

/* Ancienne fonction de Houaida pour créer un évenement:
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
*/

//Get All events on websites
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch events' });
    }
};

// Get an event by ID
export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Find the event by ID
        const event = await Event.findById(eventId).populate('organizer participants');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new event and name a user as its organizer
export const createEvent = async (req, res) => {
    try {
        const { name, description, startDate, endDate, location, organizerId, imageUrl } = req.body;

        // Create a new event
        const newEvent = new Event({
            name,
            description,
            startDate,
            endDate,
            location,
            organizer: organizerId,
            imageUrl
        });

        // Save the event to the database
        const savedEvent = await newEvent.save();

        // Update the organizer's organizerOfEvents array
        await User.findByIdAndUpdate(organizerId, { $push: { organizerOfEvents: savedEvent._id } });

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Find the events a user has participated in and those the user has organized
export const getEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId).populate('organizerOfEvents participantInEvents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const events = {
            organizerOfEvents: user.organizerOfEvents, //an array of objects not ids because we populated
            participantInEvents: user.participantInEvents //same
        };

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//A user participating in an event:
export const participateInEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        // Find the event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Add the user to the participants array if not already added
        if (!event.participants.includes(userId)) {
            event.participants.push(userId);
            await event.save();

            // Update the user's participantInEvents array
            await User.findByIdAndUpdate(userId, { $push: { participantInEvents: eventId } });

            res.status(200).json({ message: 'User successfully added to event participants' });
        } else {
            res.status(400).json({ message: 'User is already a participant in this event' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
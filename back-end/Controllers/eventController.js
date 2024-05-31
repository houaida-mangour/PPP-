import { Event } from '../models/Events.js';
import { User } from '../models/User.js';
import multer from 'multer';
import path from 'path';
import Participant from '../models/Participant.js'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

export const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate, location, price, participants, userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }
    if (!name || !description || !startDate || !endDate || !location || price === undefined || !participants) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const newEvent = new Event({
      name,
      description,
      startDate,
      endDate,
      location,
      organizer: userId, 
      imageUrl,
      price,
      participants
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }
    const events = await Event.find()
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);
    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / parsedLimit);
    res.status(200).json({
      events,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch events' });
  }
};

export const getEventById = async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch event' });
    }
  };

export const getEventsByUser = async (req, res) => {
  try {
    // Récupérer l'ID utilisateur à partir des paramètres de requête
    const userId = req.params.userId;

    // Récupérer les événements associés à l'ID utilisateur
    const events = await Event.find({ organizer: userId });

    // Renvoyer les événements à l'utilisateur
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ error: 'Unable to fetch user events' });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { eventId, name, description, startDate, endDate, location, price, participants} = req.body;
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (name) event.name = name;
    if (description) event.description = description;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (location) event.location = location;
    if (price !== undefined) event.price = price;
    if (participants !== undefined) event.participants = participants;
    if (req.file) {
      if (event.imageUrl) {
        const oldImagePath = path.join(path.resolve(), event.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err.message);
        });
      }
      event.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id; // Récupérer l'ID de l'événement à supprimer
    const deletedEvent = await Event.findByIdAndDelete(eventId); // Supprimer l'événement par son ID

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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



export const participateInEvent = async (req, res) => {
  try {
    const { food, specialRequest, userId, eventId } = req.body;

    // Vérifiez les champs requis
    if (!food || !specialRequest || !userId || !eventId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Vérifiez si l'utilisateur participe déjà à cet événement
    const existingParticipant = await Participant.findOne({ participantid: userId, participantEventid: eventId });
    if (existingParticipant) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

     // Trouver l'événement par son ID
     const event = await Event.findById(eventId);
     if (!event) {
       return res.status(404).json({ error: 'Event not found' });
     }
 
     // Vérifier si la date de début de l'événement est passée
     const now = new Date();
     if (new Date(event.startDate) < now) {
       return res.status(400).json({ error: 'Cannot participate, event has already started' });
     }
 
     // Compter le nombre actuel de participants
     const participantCount = await Participant.countDocuments({ participantEventid: eventId });
     if (participantCount >= event.participants) {
       return res.status(400).json({ error: 'Cannot participate, event is full' });
     }
 

    // Créez une nouvelle instance de Participant avec les données de la requête
    const newParticipant = new Participant({
      food,
      specialRequest,
      participantid: userId,
      participantEventid: eventId
    });
    const savedParticipant = await newParticipant.save();
    res.status(201).json(savedParticipant);
  } catch (error) {
    console.error('Error creating participant:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserParticipatedEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    const participatedEvents = await Participant.find({ participantid: userId }).populate('participantEventid');
    
    if (!participatedEvents) {
      return res.status(404).json({ message: 'No participated events found for this user' });
    }

    res.status(200).json(participatedEvents);
  } catch (error) {
    console.error('Error fetching participated events:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getEventParticipantsWithUsers = async (req, res) => {
  try {
    const eventId = req.params.id; 
    const participants = await Participant.find({ participantEventid: eventId }).populate('participantid');

    if (!participants.length) {
      return res.status(404).json({ message: 'No participants found for this event' });
    }

    const participantsWithUsers = participants.map(participant => ({
      participantId: participant._id,
      food: participant.food,
      specialRequest: participant.specialRequest,
      user: {
        userId: participant.participantid._id,
        username: participant.participantid.username, 
        email: participant.participantid.email
      }
    }));

    res.status(200).json(participantsWithUsers);
  } catch (error) {
    console.error('Error fetching event participants with users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export { upload };
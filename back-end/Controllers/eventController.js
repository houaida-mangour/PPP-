import { Event } from '../models/Events.js';
import { User } from '../models/User.js';
import multer from 'multer';
import path from 'path';

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
    const { name, description, startDate, endDate, location, price, participants } = req.body;

    // Vérifiez si l'image est fournie dans la requête
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Vérifiez les champs requis
    if (!name || !description || !startDate || !endDate || !location || price === undefined || !participants) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Créez l'URL de l'image en utilisant le chemin de l'image téléchargée
    const imageUrl = `/uploads/${req.file.filename}`;

    // Utilisez l'ID de l'utilisateur connecté comme ID de l'organisateur
    const newEvent = new Event({
      name,
      description,
      startDate,
      endDate,
      location,
      organizer: req.user._id, // Utilisez l'ID de l'utilisateur connecté
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
      const events = await Event.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit, 10));
      const totalEvents = await Event.countDocuments();
      const totalPages = Math.ceil(totalEvents / limit);
  
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




// Méthode pour mettre à jour un événement
export const updateEvent = async (req, res) => {
  try {
      // Vérifiez si l'utilisateur est authentifié
      if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      // Récupérez l'ID de l'événement à mettre à jour depuis les paramètres de la requête
      const eventId = req.params.id;

      // Recherchez l'événement dans la base de données
      const event = await Event.findById(eventId);

      // Vérifiez si l'événement existe
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      }

      // Vérifiez si l'utilisateur est l'organisateur de l'événement
      if (event.organizer.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Unauthorized' });
      }

      // Mettez à jour les propriétés de l'événement avec les nouvelles valeurs
      event.name = req.body.name || event.name;
      event.description = req.body.description || event.description;
      event.startDate = req.body.startDate || event.startDate;
      event.endDate = req.body.endDate || event.endDate;
      event.location = req.body.location || event.location;
      event.participants = req.body.participants || event.participants;
      event.price = req.body.price || event.price;

      // Enregistrez les modifications de l'événement dans la base de données
      await event.save();

      // Renvoyez la réponse avec l'événement mis à jour
      res.status(200).json({ event });
  } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Unable to update event' });
  }
};



// Méthode pour supprimer un événement
export const deleteEvent = async (req, res) => {
  try {
      // Vérifiez si l'utilisateur est authentifié
      if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      // Récupérez l'ID de l'événement à supprimer depuis les paramètres de la requête
      const eventId = req.params.id;

      // Recherchez l'événement dans la base de données
      const event = await Event.findById(eventId);

      // Vérifiez si l'événement existe
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      }

      // Vérifiez si l'utilisateur est l'organisateur de l'événement
      if (event.organizer.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Unauthorized' });
      }

      // Supprimez l'événement de la base de données
      await event.remove();

      // Renvoyez la réponse indiquant que l'événement a été supprimé avec succès
      res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Unable to delete event' });
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

export { upload };

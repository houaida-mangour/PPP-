import { Event } from '../models/Events.js';
import { User } from '../models/User.js';
import multer from 'multer';
import path from 'path';
import Participant from '../models/Participant.js'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Notification from '../models/Notification.js';


dotenv.config();

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
    const eventCreationNotification = new Notification({
      userId: userId,
      message: `You have successfully created the event "${name}".`
    });
    await eventCreationNotification.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllEvents = async (req, res) => {
  try {
      const events = await Event.find();
      res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ error: 'Unable to fetch events' });
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
    const userId = req.params.userId;
    const events = await Event.find({ organizer: userId });
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
    if (!food || !specialRequest || !userId || !eventId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingParticipant = await Participant.findOne({ participantid: userId, participantEventid: eventId });
    if (existingParticipant) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }
     const event = await Event.findById(eventId);
     if (!event) {
       return res.status(404).json({ error: 'Event not found' });
     }
      const now = new Date();
     if (new Date(event.startDate) < now) {
       return res.status(400).json({ error: 'Cannot participate, event has already started' });
     }
     const participantCount = await Participant.countDocuments({ participantEventid: eventId });
     if (participantCount >= event.participants) {
       const eventFullNotification = new Notification({
         userId: event.organizer,
         message: `Your event "${event.name}" has reached the maximum number of participants and is now full.`
       });
       await eventFullNotification.save();
 
       return res.status(400).json({ error: 'Cannot participate, event is full' });
     }
 
    const newParticipant = new Participant({
      food,
      specialRequest,
      participantid: userId,
      participantEventid: eventId
    });
    const savedParticipant = await newParticipant.save();
    const userNotification = new Notification({
      userId,
      message: `You have successfully registered for the event "${event.name}".`
    });
    await userNotification.save();

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


export const sendEmailToParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, body } = req.body;

    const participants = await Participant.find({ participantEventid: id }).populate('participantid');

    if (!participants.length) {
      return res.status(404).json({ message: 'No participants found for this event' });
    }

    const emailList = participants.map(participant => participant.participantid.email);

    console.log(`Sending email to: ${emailList.join(', ')}`);
    console.log(`Email subject: ${subject}`);
    console.log(`Email body: ${body}`);

    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, // Utilisation correcte des variables d'environnement
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Utilisation correcte des variables d'environnement
      to: emailList,
      subject: subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export { upload };
import express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, upload, getEventsByUser, participateInEvent } from '../Controllers/eventController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Correct the route to match the frontend request
router.post('/create', verifyUser, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.get('/user/:userId', verifyUser, getEventsByUser);
router.put('/:id', verifyUser, upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);
router.post('/participate',  participateInEvent);

export default router;

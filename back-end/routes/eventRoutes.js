import express from 'express';
import { createEvent, getEvents, getEventsByUserId, getEventById, participateInEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent);
router.get('/listEvents', getEvents);
router.get('/eventsOfUser/:userId', getEventsByUserId);
router.get('/:id', getEventById); //=> the id is the event's id
router.get('/makePariticipate',participateInEvent); //=> Le couplage entre event et user pour participation

export default router;
import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);
router.get('/events', getEvents);

export default router;

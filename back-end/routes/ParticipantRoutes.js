import express from 'express';
import { getUserParticipatedEvents } from '../Controllers/participantController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/user/:userId/participated', verifyUser, getUserParticipatedEvents);

export default router;

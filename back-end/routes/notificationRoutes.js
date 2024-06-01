import express from 'express';
import { getUserNotifications } from '../Controllers/notificationController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', getUserNotifications);

export default router;
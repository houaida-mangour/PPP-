import express from 'express';
import { getUserById , getAllUsers } from '../Controllers/userController.js';

const router = express.Router();

router.get("/:userId", getUserById);
router.get('/', getAllUsers);


export default router;
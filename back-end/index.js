import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import participantRoutes from './routes/ParticipantRoutes.js';

import path from 'path'; 
import cors from 'cors'; 

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);


const uploadsPath = path.join(path.resolve(), 'uploads'); 
app.use('/uploads', express.static(uploadsPath));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

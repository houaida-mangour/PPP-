import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import path from 'path'; 
import cors from 'cors'; // Importez le module cors

dotenv.config();
const app = express();

// Connecter la base de données
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Utilisez le middleware cors avec configuration
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
  credentials: true // Autorise les informations d'identification
}));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

const uploadsPath = path.join(path.resolve(), 'uploads'); 
app.use('/uploads', express.static(uploadsPath));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

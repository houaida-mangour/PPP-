import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Connexion à la base de données d'authentification
        await mongoose.connect(process.env.AUTH_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to authentication database');
        
        // Connexion à la base de données des événements
        await mongoose.createConnection(process.env.EVENTS_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to events database');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

export default connectDB;

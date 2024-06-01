import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.AUTH_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to authentication database');


        
        await mongoose.createConnection(process.env.EVENTS_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to events database');
        
        await mongoose.createConnection(process.env.PARTICIPANT_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to participant database');

        await mongoose.createConnection(process.env.NOTIFICATION_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to notification database');

    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

export default connectDB;

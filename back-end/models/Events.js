import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },

    /* J'ai fait cette modification */
    organizer : { type: mongoose.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    
    imageUrl: { type: String, required: true }
});

const Event = mongoose.model('Event', EventSchema);

export { Event };

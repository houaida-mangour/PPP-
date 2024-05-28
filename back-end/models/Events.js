import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    participants: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const Event = mongoose.model('Event', EventSchema);

export { Event };

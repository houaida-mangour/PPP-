import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organizerOfEvents:[{ type: mongoose.Types.ObjectId, ref: 'Event' }],
    participantInEvents:[{ type: mongoose.Types.ObjectId, ref: 'Event' }],
    
});

const UserModel = mongoose.model('User', UserSchema);

export { UserModel as User };
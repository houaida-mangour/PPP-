import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  food: { type: String },
  specialRequest: { type: String },
  participantid: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  participantEventid: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
});

const Participant = mongoose.model('Participant', ParticipantSchema);

export default Participant;

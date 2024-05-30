import Participant from '../models/Participant.js'; // Ensure the path to your model is correct

export const getUserParticipatedEvents = async (req, res) => {
    try {
      const userId = req.params.userId;
      const participatedEvents = await Participant.find({ participantid: userId }).populate('participantEventid');
      
      if (!participatedEvents.length) {
        return res.status(404).json({ message: 'No participated events found for this user' });
      }
  
      res.status(200).json(participatedEvents);
    } catch (error) {
      console.error('Error fetching participated events:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

import Notification from '../models/Notification.js';

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });  

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found for this user' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching user notifications:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
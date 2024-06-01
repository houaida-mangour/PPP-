// Notifications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useridresponse } from '../Login/Login.js';
import './Notifications.css';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = useridresponse;
        const response = await axios.get(`http://localhost:8000/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <span className="notification-message">{notification.message}</span>
            <span className="notification-timestamp">{notification.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

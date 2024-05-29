import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useridresponse } from '../Login/Login';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/events/user/${useridresponse}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, []);

  const handleUpdateEvent = (eventId) => {
    navigate(`/updateevent/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted event from the userEvents state
      const updatedEvents = userEvents.filter(event => event._id !== eventId);
      setUserEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error.message, error.response?.data);
      // Handle error gracefully
      alert('Failed to delete event. Please try again later.');
    }
  };
  

  return (
    <div>
      <h2>Your Events</h2>
      <ul>
        {userEvents.map(event => (
          <li key={event._id}>
            <Link to={`/eventdetails/${event._id}`}>
              <div>
                <img src={`http://localhost:8000${event.imageUrl}`} alt={event.name} style={{ maxWidth: '100px' }} />
                <span>{event.name}</span>
              </div>
            </Link>
            <button onClick={() => handleUpdateEvent(event._id)}>Update</button>
            <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/eventform">
        <button>Create New Event</button>
      </Link>
    </div>
  );
};

export default Dashboard;

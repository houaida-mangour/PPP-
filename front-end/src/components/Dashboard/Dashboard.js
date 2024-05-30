import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useridresponse } from '../Login/Login';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [participatedEvents, setParticipatedEvents] = useState([]);
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

    const fetchParticipatedEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/participants/user/${useridresponse}/participated`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParticipatedEvents(response.data);
      } catch (error) {
        console.error('Error fetching participated events:', error);
      }
    };

    fetchUserEvents();
    fetchParticipatedEvents();
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
      setUserEvents(userEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
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

      <h2>Participated Events</h2>
      <ul>
        {participatedEvents.map(participation => (
          <li key={participation.participantEventid._id}>
            <Link to={`/eventdetails/${participation.participantEventid._id}`}>
              <div>
                <img src={`http://localhost:8000${participation.participantEventid.imageUrl}`} alt={participation.participantEventid.name} style={{ maxWidth: '100px' }} />
                <span>{participation.participantEventid.name}</span>
              </div>
            </Link>
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

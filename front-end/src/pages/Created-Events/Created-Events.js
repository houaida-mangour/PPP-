import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useridresponse } from '../../components/Login2/Login';
import { Link } from 'react-router-dom';

const CreatedEvents = () => {
  const [userEvents, setUserEvents] = useState([]);

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
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default CreatedEvents ;
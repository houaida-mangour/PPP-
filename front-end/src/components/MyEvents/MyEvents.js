import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDateRange } from 'react-icons/md';
import { useridresponse } from '../Login/Login';
import './MyEvents.css';

const MyEvents = () => {
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
      setUserEvents(userEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <div className="event-grid">
        {userEvents.map(event => (
          <Card key={event._id} sx={{ width: 300, margin: 2 }}>
            <CardMedia
              component="img"
              alt={event.name}
              image={`http://localhost:8000${event.imageUrl}`}
              sx={{ height: 140, width: '100%', objectFit: 'cover' }}
            />
            <CardContent sx={{ height: 150, overflow: 'hidden' }}>
              <Typography gutterBottom variant="h6" component="div">
                {event.name.length > 20 ? `${event.name.substring(0, 20)}...` : event.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <MdOutlineDateRange /> {new Date(event.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <Link to={`/participantspage/${event._id}`}>Participants</Link>
              </Button>
              <Button size="small" color="primary" onClick={() => handleUpdateEvent(event._id)}>
                Update
              </Button>
              <Button size="small" color="secondary" onClick={() => handleDeleteEvent(event._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default MyEvents;
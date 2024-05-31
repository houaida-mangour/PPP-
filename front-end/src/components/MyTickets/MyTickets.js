import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useridresponse } from '../Login/Login';
import './MyTickets.css';

const MyTickets = () => {
  const [participatedEvents, setParticipatedEvents] = useState([]);

  useEffect(() => {
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

    fetchParticipatedEvents();
  }, []);

  return (
    <div>
      <div className="event-grid">
        {participatedEvents.map(participation => (
          <Card key={participation.participantEventid._id} sx={{ width: 300, margin: 2 }}>
            <CardMedia
              component="img"
              alt={participation.participantEventid.name}
              image={`http://localhost:8000${participation.participantEventid.imageUrl}`}
              sx={{ height: 140, width: '100%', objectFit: 'cover' }}
            />
            <CardContent sx={{ height: 150, overflow: 'hidden' }}>
              <Typography gutterBottom variant="h6" component="div">
                {participation.participantEventid.name.length > 20 ? `${participation.participantEventid.name.substring(0, 20)}...` : participation.participantEventid.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(participation.participantEventid.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {participation.participantEventid.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

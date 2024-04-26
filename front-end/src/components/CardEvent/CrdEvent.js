import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function EventCard() {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
   
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleParticipate = (eventId) => {
    history.push(`/participate/${eventId}`);
  };

  const handleLearnMore = (eventId) => {
    history.push(`/event/${eventId}`);
  };

  return (
    <>
      {events.map(event => (
        <Card key={event.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={event.name}
            height="140"
            image={event.image} // Utilisation de l'URL de l'image spécifique à chaque événement
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleParticipate(event.id)}>Participer</Button>
            <Button size="small" onClick={() => handleLearnMore(event.id)}>En savoir plus</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

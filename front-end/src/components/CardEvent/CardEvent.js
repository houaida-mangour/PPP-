import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import aeroday from './aeroday.jpg';
import ains from './ains.jpg';
import codeq from './codeq.jpg';
import nrw from './nrw.jpg';

export default function EventCard() {
  // Définir des données d'événements initiales
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Aero Day',
      description: 'Description de l\'événement 1',
      image: aeroday
    },
    {
      id: 2,
      name: 'AINS Conference',
      description: 'Description de l\'événement 2',
      image: ains
    },
    {
      id: 3,
      name: 'Code Q Summit',
      description: 'Description de l\'événement 3',
      image: codeq
    },
    {
      id: 4,
      name: 'NRW Tech Expo',
      description: 'Description de l\'événement 4',
      image: nrw
    },
    // Ajoutez d'autres événements si nécessaire
  ]);

  const history = useHistory();

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
            image={event.image}
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

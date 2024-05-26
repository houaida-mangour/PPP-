import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EventCards = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []); // Dépendance vide pour exécuter une seule fois au chargement initial

    const fetchEvents = () => {
        fetch('http://localhost:8000/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    };

    return (
        <div>
            {events.map(event => (
                <Card key={event._id} className="event-card">
                    <CardMedia
                        className="event-card-media"
                        image={event.imageUrl}
                        title={event.name}
                    />
                    <CardContent className="event-card-content">
                        <Typography gutterBottom variant="h5" component="div">
                            {event.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start Date: {new Date(event.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            End Date: {new Date(event.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Location: {event.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Participants: {event.participants}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Show More</Button>
                        <Button size="small">Inscription</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default EventCards;

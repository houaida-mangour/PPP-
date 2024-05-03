import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import aeroday from './aeroday.jpg';
import ains from './ains.jpg'
import nrw from './nrw.jpg';
import codeq from './codeq.jpg';
import './EventCard.css'; 

// Données des événements
const eventsData = [
    {
        id: 1,
        name: 'Code Q Summit',
        description: 'THE 30 MAY 2024',
        image: codeq
    },
    {
        id: 2,
        name: 'NRW Tech Expo',
        description: 'THE 27 JUNE 2024',
        image:nrw
    },
    {
        id: 3,
        name: 'AINS Conference',
        description: 'THE 02 AUG 2024',
        image: ains
    },
    {
        id: 4,
        name: 'AeroDay',
        description: 'THE 15 NOV 2024',
        image: aeroday
    }
];

const EventCards = () => {
    // Fonction pour générer les cartes d'événements
    const renderEventCards = () => {
        const groupsOfThree = [];
        for (let i = 0; i < eventsData.length; i += 3) {
            groupsOfThree.push(eventsData.slice(i, i + 3));
        }

        return groupsOfThree.map((group, index) => (
            <div key={index} className="event-card-container">
                {group.map(event => (
                    <Card key={event.id} className="event-card">
                        <CardMedia
                            className="event-card-media"
                            image={event.image}
                            title={event.name}
                        />
                        <CardContent className="event-card-content">
                            <Typography gutterBottom variant="h5" component="div">
                                {event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Show More</Button>
                            <Button size="small">Inscription</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        ));
    };

    return (
        <div>
            {renderEventCards()}
        </div>
    );
};

export default EventCards;

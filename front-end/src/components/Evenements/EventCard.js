import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDateRange } from 'react-icons/md';
import './EventCard.css';
import { useridresponse } from '../Login/Login';

const EventCard = ({ event, hidePrice }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (useridresponse !=null) {
      console.log("Token and user ID found:", token, userId);
      setIsLoggedIn(true);
    } else {
      console.log("Token or user ID not found");
      setIsLoggedIn(false);
    }
  }, []);

  const handleParticipateClick = () => {
    if (isLoggedIn) {
      navigate('/participateform');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="EventCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={event.name}
          image={`http://localhost:8000${event.imageUrl}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <MdOutlineDateRange />
            {new Date(event.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location}
          </Typography>
          {!hidePrice && (
            <Typography variant="body2" color="text.secondary">
              Price: {event.isFree ? 'Free' : `${event.price} DT`}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button>
            <Link to={`/eventdetails/${event._id}`}>Learn More</Link>
          </Button>
          <Button onClick={handleParticipateClick}>Participate</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventCard;

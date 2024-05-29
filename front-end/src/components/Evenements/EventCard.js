import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './EventCard.css'; 
import { Link } from 'react-router-dom';
import { MdOutlineDateRange } from "react-icons/md";


const EventCard = ({ event, hasOrderLink, hidePrice }) => {
  return (
    <div className="EventCard"> {/* Add EventCard class to the container */}
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
       <Button><Link to={`/eventdetails/${event._id}`}>Learn More</Link> </Button>
        <Button size="small">Participate</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventCard;

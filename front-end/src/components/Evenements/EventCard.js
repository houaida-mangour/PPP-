// EventCard.js
import React from 'react';

const EventCard = ({ event, hasOrderLink, hidePrice }) => {
  return (
    <div >
      <img src={`http://localhost:8000${event.imageUrl}`} alt={event.name}  />
      <div className="event-card-content">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        {!hidePrice && <p>Price: {event.isFree ? 'Free' : `$${event.price}`}</p>}
        {hasOrderLink && <button>Inscription</button>}
      </div>
    </div>
  );
};

export default EventCard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventResponse = await axios.get(`http://localhost:8000/events/${id}`);
        setEvent(eventResponse.data);
        console.log(eventResponse.data.imageUrl);  // Vérifiez l'URL de l'image
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <h1>Event Details</h1>
        <h2>{event && event.name}</h2>
        <p>{event && event.description}</p>
        <p>Start Date: {event && new Date(event.startDate).toLocaleDateString()}</p>
        <p>End Date: {event && new Date(event.endDate).toLocaleDateString()}</p>
        <p>Price: {event && event.isFree ? 'Free' : `$${event.price}`}</p>
        {/* Afficher l'image de l'événement */}
        {event && event.imageUrl && (
          <img src={`http://localhost:8000${event.imageUrl}`} alt="Event" style={{ maxWidth: '100%' }} />
        )}
        {/* Afficher d'autres détails de l'événement ici */}
      </div>
    </>
  );
};

export default EventDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ParticipantList = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/${id}/participants`);
        setParticipants(response.data);
        console.log('Response data', response.data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, [id]);

  return (
    <div>
      <h2>Participants for Event {id}</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant.participantId}>
            <p>Name: {participant.user.name}</p>
            <p>Email: {participant.user.email}</p>
            <p>Food request: {participant.food}</p>
            <p>Special Request: {participant.specialRequest}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;

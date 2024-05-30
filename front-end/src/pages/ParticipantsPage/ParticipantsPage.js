import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ParticipantPage.css'; 

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
    <div className="participant-list">
      <h2>Participants for Event {id}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Food Request</th>
            <th>Special Request</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => (
            <tr key={participant.participantId}>
              <td>{participant.user.username}</td>
              <td>{participant.user.email}</td>
              <td>{participant.food}</td>
              <td>{participant.specialRequest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;

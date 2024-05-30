import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useridresponse } from '../Login/Login';
import { eventidresponse } from '../Evenements/EventCard';

const ParticipantForm = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState('');
  const [selectRequest, setSelectRequest] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const participantData = {
        food,
        specialRequest: selectRequest,
        userId: useridresponse,
        eventId: eventidresponse,
      };

      console.log('les donnees sont: ',participantData);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const uploadResponse = await axios.post('http://localhost:8000/events/participate', participantData, config);

      console.log('Upload Response:', uploadResponse.data);

      if (uploadResponse.data) {
        navigate(`/eventdetails/${eventidresponse}`);
      } else {
        console.error('Error adding participant');
      }

      setFood('');
      setSelectRequest('');

    } catch (error) {
      console.error('Error participating in event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food" required></textarea>
      <textarea value={selectRequest} onChange={(e) => setSelectRequest(e.target.value)} placeholder="Select Request" required></textarea>
      <button type="submit">Submit Form</button>
    </form>
  );
};

export default ParticipantForm;

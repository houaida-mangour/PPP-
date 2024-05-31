import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useridresponse } from '../Login/Login';
import { eventidresponse } from '../Evenements/EventCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ParticipantForm.css";

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

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const uploadResponse = await axios.post('http://localhost:8000/events/participate', participantData, config);

      if (uploadResponse.status === 201) {
        navigate(`/eventdetails/${eventidresponse}`);
      } else {
        console.error('Error adding participant');
      }

      setFood('');
      setSelectRequest('');

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error, { autoClose: false });
      } else if (error.response && error.response.status === 404) {
        toast.error('Event not found', { autoClose: false });
      } else if (error.response && error.response.status === 500) {
        toast.error('Internal Server Error', { autoClose: false });
      } else {
        toast.error('An unexpected error occurred', { autoClose: false });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <p>Catering: food preferences,food allergy...</p>
        <textarea value={food} onChange={(e) => setFood(e.target.value)} placeholder="Food" required></textarea>
        <textarea value={selectRequest} onChange={(e) => setSelectRequest(e.target.value)} placeholder="Select Request" required></textarea>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default ParticipantForm;

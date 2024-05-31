import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useridresponse } from '../Login2/Login';
import { dividerClasses } from '@mui/material';
import './EventForm.css'


const EventForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('location', location);
      formData.append('participants', participants);
      formData.append('price', isFree ? 0 : price);
      formData.append('image', imageFile);
      formData.append('userId', useridresponse);

      const token = localStorage.getItem('token');

      const uploadResponse = await axios.post('http://localhost:8000/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Upload Response:', uploadResponse);

      if (uploadResponse.data && uploadResponse.data._id) {
        navigate(`/eventdetails/${uploadResponse.data._id}`);
      } else {
        console.error('Event ID not found in response');
      }

      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setLocation('');
      setParticipants('');
      setIsFree(false);
      setImageFile(null);

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className='w'>
      <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required></textarea>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input type="number" value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder="Participants" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required={!isFree} disabled={isFree} />
      <label>
        Free Event
        <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
      </label>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
      <button type="submit">Create Event</button>
    </form>
    </div>
    
  );
};

export default EventForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useridresponse } from '../Login/Login';
import './EventForl.css';

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
  const [cateringTypes, setCateringTypes] = useState([]);
  const [roomingOptions, setRoomingOptions] = useState([]);
  const [detailedPlan, setDetailedPlan] = useState(''); 

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
      formData.append('cateringTypes', cateringTypes);
      formData.append('roomingOptions', roomingOptions);
      formData.append('detailedPlan', detailedPlan); 
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
      setCateringTypes([]);
      setRoomingOptions([]);
      setDetailedPlan('');

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
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
      <p>Catering</p>
      <div className="checkbox-container">
        <label className="catering-label">
          <input type="checkbox" value="Break-coffee" checked={cateringTypes.includes('Break-coffee')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setCateringTypes([...cateringTypes, e.target.value]);
            } else {
              setCateringTypes(cateringTypes.filter(type => type !== e.target.value));
            }
          }} />
          <span>Break-coffee</span>
        </label>
        <label className="catering-label">
          <input type="checkbox" value="Breakfast" checked={cateringTypes.includes('Breakfast')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setCateringTypes([...cateringTypes, e.target.value]);
            } else {
              setCateringTypes(cateringTypes.filter(type => type !== e.target.value));
            }
          }} />
          <span>Breakfast</span>
        </label>
        <label className="catering-label">
          <input type="checkbox" value="Lunch" checked={cateringTypes.includes('Lunch')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setCateringTypes([...cateringTypes, e.target.value]);
            } else {
              setCateringTypes(cateringTypes.filter(type => type !== e.target.value));
            }
          }} />
          <span>Lunch</span>
        </label>
        <label className="catering-label">
          <input type="checkbox" value="Dinner" checked={cateringTypes.includes('Dinner')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setCateringTypes([...cateringTypes, e.target.value]);
            } else {
              setCateringTypes(cateringTypes.filter(type => type !== e.target.value));
            }
          }} />
          <span>Dinner</span>
        </label>
      </div>
      <p>Rooming </p>
      <div className="checkbox-container">
        <label className="rooming-label">
          <input type="checkbox" value="Single" checked={roomingOptions.includes('Single')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setRoomingOptions([...roomingOptions, e.target.value]);
            } else {
              setRoomingOptions(roomingOptions.filter(option => option !== e.target.value));
            }
          }} />
          <span>Single</span>
        </label>
        <label className="rooming-label">
          <input type="checkbox" value="Double" checked={roomingOptions.includes('Double')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setRoomingOptions([...roomingOptions, e.target.value]);
            } else {
              setRoomingOptions(roomingOptions.filter(option => option !== e.target.value));
            }
          }} />
          <span>Double</span>
        </label>
        <label className="rooming-label">
          <input type="checkbox" value="Suite" checked={roomingOptions.includes('Suite')} onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setRoomingOptions([...roomingOptions, e.target.value]);
            } else {
              setRoomingOptions(roomingOptions.filter(option => option !== e.target.value));
            }
          }} />
          <span>Triple</span>
        </label>
      </div>
      <label htmlFor="detailedPlan">Detailed Plan:</label>
      <textarea
        id="detailedPlan"
        name="detailedPlan"
        value={detailedPlan}
        onChange={(e) => setDetailedPlan(e.target.value)}
        placeholder="Enter the detailed plan for the event"
        
      />
      <p><b>Thumbnail</b>t</p>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;

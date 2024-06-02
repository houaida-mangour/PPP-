import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    participants: '',
    price: 0,
    imageFile: null,
    cateringTypes: [],
    roomingOptions: [],
    detailedPlan: '',
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventData({
          ...response.data,
          imageFile: null, 
        });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('eventId', id);
      for (const key in eventData) {
        if (key === 'imageFile' && eventData.imageFile) {
          formData.append('image', eventData.imageFile);
        } else {
          formData.append(key, eventData[key]);
        }
      }
      const response = await axios.put(`http://localhost:8000/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Update Response:', response);
      navigate(`/eventdetails/${id}`);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newValue = type === 'file' ? files[0] : value;
    setEventData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setEventData((prevData) => {
      const isChecked = prevData[field].includes(value);
      if (isChecked) {
        return {
          ...prevData,
          [field]: prevData[field].filter((item) => item !== value),
        };
      } else {
        return {
          ...prevData,
          [field]: [...prevData[field], value],
        };
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          placeholder="Event Name"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
        />
        <input
          type="date"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="price"
          value={eventData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="participants"
          value={eventData.participants}
          onChange={handleChange}
          placeholder="Participants"
        />
        <p>Catering</p>
        <div className="checkbox-container">
          <label className="catering-label">
            <input
              type="checkbox"
              value="Break-coffee"
              checked={eventData.cateringTypes.includes('Break-coffee')}
              onChange={(e) => handleCheckboxChange('cateringTypes', e.target.value)}
            />
            <span>Break-coffee</span>
          </label>
          <label className="catering-label">
            <input
              type="checkbox"
              value="Breakfast"
              checked={eventData.cateringTypes.includes('Breakfast')}
              onChange={(e) => handleCheckboxChange('cateringTypes', e.target.value)}
            />
            <span>Breakfast</span>
          </label>
          <label className="catering-label">
            <input
              type="checkbox"
              value="Lunch"
              checked={eventData.cateringTypes.includes('Lunch')}
              onChange={(e) => handleCheckboxChange('cateringTypes', e.target.value)}
            />
            <span>Lunch</span>
          </label>
          <label className="catering-label">
            <input
              type="checkbox"
              value="Dinner"
              checked={eventData.cateringTypes.includes('Dinner')}
              onChange={(e) => handleCheckboxChange('cateringTypes', e.target.value)}
            />
            <span>Dinner</span>
          </label>
        </div>
        <p>Rooming</p>
        <div className="checkbox-container">
          <label className="rooming-label">
            <input
              type="checkbox"
              value="Single"
              checked={eventData.roomingOptions.includes('Single')}
              onChange={(e) => handleCheckboxChange('roomingOptions', e.target.value)}
            />
            <span>Single</span>
          </label>
          <label className="rooming-label">
            <input
              type="checkbox"
              value="Double"
              checked={eventData.roomingOptions.includes('Double')}
              onChange={(e) => handleCheckboxChange('roomingOptions', e.target.value)}
            />
            <span>Double</span>
          </label>
          <label className="rooming-label">
            <input
              type="checkbox"
              value="Suite"
              checked={eventData.roomingOptions.includes('Suite')}
              onChange={(e) => handleCheckboxChange('roomingOptions', e.target.value)}
            />
            <span>Suite</span>
          </label>
        </div>
        <label htmlFor="detailedPlan">Detailed Plan:</label>
        <textarea
          id="detailedPlan"
          name="detailedPlan"
          value={eventData.detailedPlan}
          onChange={handleChange}
          placeholder="Enter the detailed plan for the event"
        />
        <input type="file" name="imageFile" onChange={handleChange} />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEventForm;

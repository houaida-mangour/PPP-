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
          imageFile: null, // Initially no new image
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
        <input
          type="file"
          name="imageFile"
          onChange={handleChange}
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEventForm;

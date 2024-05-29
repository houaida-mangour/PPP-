import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/events/${id}`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={event.name || ''}
          onChange={handleChange}
          placeholder="Event Name"
        />
        <input
          type="text"
          name="description"
          value={event.description || ''}
          onChange={handleChange}
          placeholder="Event Description"
        />
        <input
          type="date"
          name="startDate"
          value={event.startDate || ''}
          onChange={handleChange}
          placeholder="Start Date"
        />
        <input
          type="date"
          name="endDate"
          value={event.endDate || ''}
          onChange={handleChange}
          placeholder="End Date"
        />
        <input
          type="text"
          name="location"
          value={event.location || ''}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="price"
          value={event.price || ''}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="participants"
          value={event.participants || ''}
          onChange={handleChange}
          placeholder="Participants"
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;

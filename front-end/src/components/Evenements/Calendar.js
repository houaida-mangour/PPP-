import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Calendar.css'

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/allevents');
        const eventsData = response.data.map(event => ({
          id: event._id,
          title: event.name,
          start: new Date(event.startDate),
          end: new Date(event.endDate)
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventSelect = event => {
    navigate(`/eventdetails/${event.id}`);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '500px', width: '90%' }}
        onSelectEvent={handleEventSelect}
      />
    </div>
  );
};

export default MyCalendar;

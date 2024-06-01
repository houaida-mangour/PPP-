// Calendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/events/allevents');
                console.log('Fetched events:', response.data); 
                const eventsData = response.data.map(event => ({
                    title: event.name, 
                    start: new Date(event.startDate),
                    end: new Date(event.endDate)
                }));
                console.log('Mapped events:', eventsData); 
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);
    

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: '500px', width: '90%' }}
            />
        </div>
    );
};

export default MyCalendar;

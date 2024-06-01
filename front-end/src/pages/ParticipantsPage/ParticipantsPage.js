import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ParticipantPage.css';

const ParticipantList = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/${id}`);
        setEventName(response.data.name); 
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

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

  const sendEmailToParticipants = async () => {
    try {
      await axios.post(`http://localhost:8000/events/${id}/send-email`, {
        subject: emailSubject,
        body: emailBody
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="participant-list">
      <h2>Participants for Event {eventName}</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
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

      <div className="email-form">
        <h3>Send Email to Participants</h3>
        <input 
          type="text"
          placeholder="Subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
        />
        <button onClick={sendEmailToParticipants}>Send Email</button>
      </div>
    </div>
  );
};

export default ParticipantList;

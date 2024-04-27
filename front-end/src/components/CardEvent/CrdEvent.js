import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EventCard() {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleParticipate = (eventId) => {
    history.push(`/participate/${eventId}`);
  };

  const handleLearnMore = (eventId) => {
    history.push(`/event/${eventId}`);
  };

  return (
    <Container>
      {events.map((event, index) => (
        index % 3 === 0 && <Row key={index}>
          {events.slice(index, index + 3).map(event => (
            <Col key={event.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={event.image} alt={event.name} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {event.description}
                  </Card.Text>  
                  <Button variant="primary" onClick={() => handleParticipate(event.id)}>Participer</Button>
                  <Button variant="secondary" onClick={() => handleLearnMore(event.id)}>En savoir plus</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}

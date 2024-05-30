import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import "./EventDetails.css";
import { GiPositionMarker } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { useridresponse } from '../Login/Login';
let eventidresponse= null;


const EventDetails = () => {
  const { id } = useParams();
  eventidresponse=id;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (useridresponse!=null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventResponse = await axios.get(`http://localhost:8000/events/${id}`);
        setEvent(eventResponse.data);
        console.log(eventResponse.data.imageUrl);  
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleParticipateClick = () => {
    if (isLoggedIn) {
      navigate('/participateform');
    } else {
      navigate('/login');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div> 
      <Navbar />
      <div className="containerdetails flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        <div className="containerdetails mx-auto px-4">
          {/* Afficher l'image de l'événement */}
          {event && event.imageUrl && (
            <img src={`http://localhost:8000${event.imageUrl}`} alt="Event" style={{ maxWidth: '100%' }} />
          )}
        </div>
        <div className="mx-auto px-5 lg:px-5">
          <h1>{event && event.name}</h1>
          <p>{event && event.description}</p>
          <p>
            <MdOutlineDateRange /> Start Date: {event && new Date(event.startDate).toLocaleDateString()}
          </p>
          <p>
            <MdOutlineDateRange /> End Date: {event && new Date(event.endDate).toLocaleDateString()}
          </p>
          <p>
            <GiPositionMarker /> {event && event.location}
          </p>
          <p>
            <IoIosPricetags /> Price: {event && event.isFree ? 'Free' : `${event.price} DT`}
          </p>
          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="button-participate" onClick={handleParticipateClick}>Participate</button>
          </div>
        </div>
      </div>
    </div> 
  );
};

export {EventDetails,eventidresponse};

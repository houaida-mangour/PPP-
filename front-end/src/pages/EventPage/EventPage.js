import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collection from "../../components/Evenements/Collection.js";
import Navbar from "../../components/Navbar/Navbar";



const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/events?page=${page}&limit=6`);
          setEvents(response.data.events || []);
          setTotalPages(response.data.totalPages || 1);
        } catch (err) {
          console.error('Error fetching events', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvents();
    }, [page]);
  
    if (loading) return <p>Loading...</p>;
  
    return (
        <div>
      <Navbar />
      <Collection
        data={events}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={page}
        totalPages={totalPages}
      />
      </div>
    );
  };
  
  export default EventPage;
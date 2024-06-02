import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collection from '../../components/Evenements/Collection';

const EventPagedash = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const pageSize = 6;
        const eventsPerPage = [];
        let totalPages = 1;
  
        const totalResponse = await axios.get(`http://localhost:8000/events`);
        totalPages = totalResponse.data.totalPages || 1;
  
        for (let i = 1; i <= totalPages; i++) {
          const response = await axios.get(`http://localhost:8000/events?page=${i}&limit=${pageSize}`);
          eventsPerPage.push(...(response.data.events || []));
        }
  
        setEvents(eventsPerPage);
        setTotalPages(totalPages);
      } catch (err) {
        console.error('Error fetching events', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
     
      <Collection
        data={events}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EventPagedash;

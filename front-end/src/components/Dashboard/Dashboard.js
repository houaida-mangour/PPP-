import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Collection from '../Evenements/Collection';
import { Link } from 'react-router-dom';
import { useridresponse } from '../Login/Login';

const Dashboard = () => {
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [eventsPage, setEventsPage] = useState(1);
  // const [totalEventPages, setTotalEventPages] = useState(0);

  useEffect(() => {
    const fetchOrganizedEvents = async () => {
      try {
        const userId = useridresponse;

        const response = await Axios.get(`/events/user/${userId}`);
        setOrganizedEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching organized events:', error);
      }
    };

    fetchOrganizedEvents();
  }, [eventsPage]);

  const handleEventPageChange = (page) => {
    setEventsPage(page);
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <button asChild size="lg" className="button hidden sm:flex">
            <Link to="/eventform">
              <button>Create Event</button>
            </Link>
          </button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          onPageChange={handleEventPageChange}
          // totalPages={totalEventPages}
        />
      </section>
    </>
  );
};

export default Dashboard;

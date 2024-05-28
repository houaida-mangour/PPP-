// Dashboard.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import  Collection  from '../Evenements/Collection';
import { Link } from 'react-router-dom';


const Dashboard = ({ searchParams }) => {
  const [orderedEvents, setOrderedEvents] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [totalOrderPages, setTotalOrderPages] = useState(0);
  const [totalEventPages, setTotalEventPages] = useState(0);

  useEffect(() => {
    // Fetch ordered events
    const fetchOrderedEvents = async () => {
      try {
        const response = await Axios.get(`/api/orders?page=${ordersPage}`);
        setOrderedEvents(response.data.events);
        setTotalOrderPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching ordered events:', error);
      }
    };

    // Fetch organized events
    const fetchOrganizedEvents = async () => {
      try {
        const response = await Axios.get(`/api/events?page=${eventsPage}`);
        setOrganizedEvents(response.data.events);
        setTotalEventPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching organized events:', error);
      }
    };

    fetchOrderedEvents();
    fetchOrganizedEvents();
  }, [ordersPage, eventsPage]);

  const handleOrderPageChange = (page) => {
    setOrdersPage(page);
  };

  const handleEventPageChange = (page) => {
    setEventsPage(page);
  };

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <button asChild size="lg" className="button hidden sm:flex">
            <Link to="/events">
              Explore More Events
            </Link>
          </button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          onPageChange={handleOrderPageChange}
          totalPages={totalOrderPages}
        />
      </section>

      {/* Events Organized */}
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
          totalPages={totalEventPages}
        />
      </section>
    </>
  );
};

export default Dashboard;

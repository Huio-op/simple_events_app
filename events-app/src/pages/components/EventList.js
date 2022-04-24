import React, { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';
import Api from '../../api/Api';
import EventCard from '../components/EventCard';

const EventList = ({ email }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const events = await Api.Events.fetchEvents();
      setEvents(events);
    } catch (e) {
      console.error(e);
      Toast.error(e.response?.data.error.message || 'Erro ao buscar eventos!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="PageCard">
        {events.map((event) => {
          return (
            <EventCard title={event.name} description={event.description} />
          );
        })}
      </div>
    </>
  );
};

export default EventList;

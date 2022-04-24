import React, { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';
import Api from '../../api/Api';
import EventCard from '../components/EventCard';

const EventList = ({ subscribed }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const events = subscribed
        ? await Api.Events.findSubscribed()
        : await Api.Events.fetchEvents();
      setEvents(events);
    } catch (e) {
      console.error(e);
      Toast.error(e.response?.data.error.message || 'Erro ao buscar eventos!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [subscribed]);

  return (
    <>
      <div className="PageCard">
        {events.length === 0 && subscribed && (
          <div className="card">
            <h3>Você não está inscrito em nenhum evento</h3>
            <h6>
              Volte para a página de eventos e se inscreva em algum que você
              gostar
            </h6>
          </div>
        )}
        {events.map((event, index) => {
          return (
            <EventCard
              key={index}
              title={event.name}
              description={event.description}
              eventId={event.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default EventList;

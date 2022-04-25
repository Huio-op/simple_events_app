import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import './EventDetailed.css';

const EventDetailed = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const fetchEvent = async () => {
    const event = await Api.Events.findEvent(id);
    setEvent(event);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="PageCard" style={{ alignItems: 'center' }}>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="ExtraEventInfo">
        <span>
          Marcado para o dia:{' '}
          <strong>{Moment(new Date(event.date)).format('DD/MM/YYYY')}</strong>
        </span>
        <span>
          Inscrições: <strong>{event.num_atendees}</strong>
        </span>
      </div>
      <div className="Buttons"></div>
    </div>
  );
};

export default EventDetailed;

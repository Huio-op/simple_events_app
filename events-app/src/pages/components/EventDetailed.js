import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import { useParams } from 'react-router-dom';
import Moment from 'moment';

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
        {Moment(new Date(event.date)).format('DD/MM/YYYY')}
      </div>
      <div className="Buttons"></div>
    </div>
  );
};

export default EventDetailed;

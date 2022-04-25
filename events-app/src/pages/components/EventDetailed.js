import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import { useParams } from 'react-router-dom';

const EventDetailed = ({ ...props }) => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const fetchEvent = async () => {
    const event = await Api.Events.findEvent(id);
    setEvent(event);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  console.log('testeee', event);

  return (
    <div className="PageCard" style={{ alignItems: 'center' }}>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="ExtraEventInfo"></div>
      <div className="Buttons"></div>
    </div>
  );
};

export default EventDetailed;

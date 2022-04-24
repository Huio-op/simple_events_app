import React from 'react';
import EventCard from '../components/EventCard';

const EventList = ({ email }) => {
  console.log('emememe', email);
  return (
    <>
      <div className="PageCard">
        <EventCard
          title="Lizard"
          description="Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica"
        />
        <EventCard
          title="Lizard"
          description="Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica"
        />
      </div>
    </>
  );
};

export default EventList;

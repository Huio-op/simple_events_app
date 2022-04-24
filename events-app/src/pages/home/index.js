import React, { useState } from 'react';
import './index.css';
import TopMenuBar from '../components/TopMenuBar';
import EventCard from '../components/EventCard';

const Home = () => {
  return (
    <div className="Home homeBackground">
      <div className="PageHeader">
        <TopMenuBar />
      </div>
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
    </div>
  );
};

export default Home;

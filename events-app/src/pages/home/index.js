import React, { useState } from 'react';
import './index.css';
import TopMenuBar from '../components/TopMenuBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div className="Home homeBackground">
      <div className="PageHeader">
        <TopMenuBar />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/home/events" />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/userEvents" element={<EventList email="teste" />} />
      </Routes>
    </div>
  );
};

export default Home;

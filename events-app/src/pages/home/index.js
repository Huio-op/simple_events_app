import React from 'react';
import './index.css';
import TopMenuBar from '../components/TopMenuBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import EventList from '../components/EventList';
import Profile from '../components/Profile';
import CertificateTemplate from '../components/CertificateTemplate';

const Home = () => {
  return (
    <div className="Home homeBackground">
      <div className="PageHeader">
        <TopMenuBar />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/home/events" />} />
        <Route path="/events" element={<EventList />} />
        <Route
          path="/events/subscribed"
          element={<EventList subscribed={true} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/certificate" element={<EventList pastEvents={true} />} />
        <Route path="/certificate" element={<CertificateTemplate />} />
      </Routes>
    </div>
  );
};

export default Home;

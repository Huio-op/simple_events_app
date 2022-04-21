import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;

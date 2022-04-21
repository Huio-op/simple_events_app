import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;

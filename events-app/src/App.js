import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/notFound';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const App = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    let loggedIn;
    token && token !== '' ? (loggedIn = true) : (loggedIn = false);

    return loggedIn;
  };

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/home/*"
            element={loggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route exact path="/profile" />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeButton={false}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </Router>
  );
};

if (typeof window !== 'undefined') {
  injectStyle();
}

export default App;

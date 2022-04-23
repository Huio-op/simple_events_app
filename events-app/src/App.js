import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import NotFound from './pages/notFound';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
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

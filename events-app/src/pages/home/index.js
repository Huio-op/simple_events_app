import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';

const Home = () => {
  const [fieldValues, setFieldValues] = useState({});

  const fetchEvents = async () => {
    try {
      const user = await Api.User.findUser(fieldValues.email);
      console.log('Teste Usuário', user);
    } catch (e) {
      console.log({ e }, e.response.data.message);
      console.error(e);
    }
  };

  return (
    <div className="Home homeBackground">
      <div className="PageHeader"></div>
      <div className="PageCard"></div>
    </div>
  );
};

export default Home;

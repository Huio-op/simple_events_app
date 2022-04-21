import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';

const Login = () => {
  const [fieldValues, setFieldValues] = useState({});

  const findUser = async () => {
    try {
      const user = await Api.User.findUser(fieldValues.email);
      console.log('Teste Usuário', user);
    } catch (e) {
      console.log({ e }, e.response.data.message);
      console.error(e);
    }
  };

  return (
    <div className="Login defaultBackground">
      <div className="card">
        <h3>Login</h3>
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          onChange={(e) =>
            setFieldValues({ ...fieldValues, email: e.currentTarget.value })
          }
        />
        <TextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
        />
        <Button className="filledButton" variant="contained" onClick={findUser}>
          Login
        </Button>
        <a className="signupRedirect" href="/signup">
          <Button className="outlinedButton" variant="outlined">
            Sign up
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Login;

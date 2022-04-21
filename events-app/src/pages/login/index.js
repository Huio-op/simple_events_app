import React from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const notFunction = () => {};

  return (
    <div className="Login">
      <div className="loginCard">
        <h3>Login</h3>
        <TextField id="email" label="E-mail" variant="outlined" type="email" />
        <TextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
        />
        <Button className="loginButton" variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;

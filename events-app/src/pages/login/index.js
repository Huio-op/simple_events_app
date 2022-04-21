import React from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const notFunction = () => {};

  return (
    <div className="Login defaultBackground">
      <div className="card">
        <h3>Login</h3>
        <TextField id="email" label="E-mail" variant="outlined" type="email" />
        <TextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
        />
        <Button className="filledButton" variant="contained">
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

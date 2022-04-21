import React from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
  return (
    <div className="Signup defaultBackground">
      <div className="card">
        <h3>Cadastro</h3>
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
        <a className="loginRedirect" href="/login">
          <Button className="outlinedButton" variant="outlined">
            Voltar para Login
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Signup;

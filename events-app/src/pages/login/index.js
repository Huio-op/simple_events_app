import React, { useState } from 'react';
import './index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import Toast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [fieldValues, setFieldValues] = useState({});

  const navigate = useNavigate();

  const validateLogin = async () => {
    try {
      const {token} = await Api.User.userLogin(fieldValues.email, fieldValues.password);
      if (token !== null && token !== '') {
        Toast.success('Login feito com sucesso!');
        await localStorage.setItem('ACCESS_TOKEN', token);
        navigate('/home');        
      }
    } catch (e) {
      console.log('err', { e });
      if (e.response?.data.error.status === 409) {
        Toast.error(e.response?.data.error.message);
      } else {
        Toast.error('Falha no login!');
      }
    }
  }

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
          onChange={(e) =>
            setFieldValues({ ...fieldValues, password: e.currentTarget.value })
          }
        />
        <Button className="filledButton" variant="contained" onClick={validateLogin}>
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

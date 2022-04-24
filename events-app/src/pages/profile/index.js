import React, { useState } from 'react';
import './index.css';
import TopMenuBar from '../components/TopMenuBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Profile = () => {
  const [fieldValues, setFieldValues] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const [errorsEmail, setErrorsEmail] = useState({});
  const [helperPassword, setHelperPassword] = useState({});
  const [helperEmail, setHelperEmail] = useState({});

  //TODO: Find a way to get user info using token

  const enteringForm = async () => {};

  //TODO: editUser method should make something
  const editUser = async (event) => {
    event.preventDefault();
    const validPassword = validatePassword();
    const validEmail = validateEmail();
    if (validEmail && validPassword) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = () => {
    if (fieldValues.password === '') {
      return true;
    } else {
      if (fieldValues.password === fieldValues.passwordConfirm) {
        setHelperPassword({ password: '' });
        setErrorsPassword({
          ...errorsPassword,
          password: false,
          passwordConfirm: false,
        });
        return true;
      } else {
        setHelperPassword({ password: 'As senhas digitadas não coincidem' });
        setErrorsPassword({
          ...errorsPassword,
          password: true,
          passwordConfirm: true,
        });
        console.log('senhas não valido');
        return false;
      }
    }
  };

  const validateEmail = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!regex.test(fieldValues.email)) {
      setErrorsEmail({ ...errorsEmail, email: true });
      setHelperEmail({ email: 'O e-mail digitado não é válido' });
      console.log('email não valido');
      return false;
    } else {
      setErrorsEmail({ ...errorsEmail, email: false });
      setHelperEmail({ email: '' });
      return true;
    }
  };

  return (
    <div className="Profile profileBackground">
      <div className="PageHeader">
        <TopMenuBar />
      </div>
      <div className="PageCard">
        <form onSubmit={editUser}>
          <div className="card">
            <h3>Editar Cadastro</h3>
            <TextField
              id="nome"
              label="Nome Completo"
              variant="outlined"
              name="nome"
            />
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              name="email"
              onChange={(e) => {
                setFieldValues({ ...fieldValues, email: e.target.value });
              }}
              error={errorsEmail.email}
              helperText={helperEmail.email}
            />
            <TextField
              id="phone"
              label="Telefone"
              variant="outlined"
              name="phone"
            />
            <TextField
              id="country"
              label="País"
              variant="outlined"
              name="country"
            />
            <TextField
              id="password"
              label="Senha"
              name="password"
              variant="outlined"
              type="password"
              error={errorsPassword.password}
              helperText={helperPassword.password}
              onChange={(e) => {
                setFieldValues({ ...fieldValues, password: e.target.value });
              }}
            />
            <TextField
              id="passwordConfirm"
              label="Confirme sua senha"
              name="password"
              variant="outlined"
              type="password"
              error={errorsPassword.passwordConfirm}
              onChange={(e) => {
                setFieldValues({
                  ...fieldValues,
                  passwordConfirm: e.target.value,
                });
              }}
            />
            <Button className="outlinedButton" variant="outlined" type="submit">
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

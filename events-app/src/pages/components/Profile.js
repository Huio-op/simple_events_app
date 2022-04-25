import React, { useEffect, useState } from 'react';
import './Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import { Tooltip } from '@mui/material';
import Toast from '../../utils/Toast';

const Profile = () => {
  const [userValues, setUserValues] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const [errorsEmail, setErrorsEmail] = useState({});
  const [helperPassword, setHelperPassword] = useState({});
  const [helperEmail, setHelperEmail] = useState({});

  //TODO setar default values para os campos baseado noq o usuário tem de informação

  const fetchUser = async () => {
    console.log('entrou');
    try {
      const { user } = await Api.User.findUser();
      console.log(user.email);
      setUserValues({
        ...userValues,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
      });
      return user;
    } catch (e) {
      console.log('deu ruim');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //TODO: editUser method should make something
  const editUser = async (event) => {
    console.log(userValues);
    event.preventDefault();
    const validEmail = validateEmail();
    if (validEmail) {
      try {
        const newUser = await Api.User.editUser(userValues);
        Toast.success('Usuário editado com sucesso!');
      } catch (e) {
        console.error(e);
        Toast.error('Erro ao editar usuário!');
      }
      return true;
    } else {
      return false;
    }
  };

  // const validatePassword = () => {
  //   if (userValues.password === '') {
  //     return true;
  //   } else {
  //     if (userValues.password === userValues.passwordConfirm) {
  //       setHelperPassword({ password: '' });
  //       setErrorsPassword({
  //         ...errorsPassword,
  //         password: false,
  //         passwordConfirm: false,
  //       });
  //       return true;
  //     } else {
  //       setHelperPassword({ password: 'As senhas digitadas não coincidem' });
  //       setErrorsPassword({
  //         ...errorsPassword,
  //         password: true,
  //         passwordConfirm: true,
  //       });
  //       console.log('senhas não valido');
  //       return false;
  //     }
  //   }
  // };

  const validateEmail = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!regex.test(userValues.email)) {
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

  console.log('antes do rerererererererer', userValues);

  return (
    <div className="PageCard">
      <form onSubmit={editUser}>
        <div className="card">
          <h3>Editar Cadastro</h3>
          <Tooltip
            title="Não é possível alterar o e-mail cadastrado"
            className="disabledEmailField"
          >
            <TextField
              id="email"
              disabled
              label="E-mail"
              value={userValues.email}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              name="email"
              onChange={(e) => {
                setUserValues({ ...userValues, email: e.target.value });
              }}
              error={errorsEmail.email}
              helperText={helperEmail.email}
            />
          </Tooltip>
          <TextField
            id="nome"
            label="Nome Completo"
            value={userValues.name}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="nome"
            onChange={(e) => {
              setUserValues({ ...userValues, name: e.target.value });
            }}
          />
          <TextField
            id="phone"
            label="Telefone"
            value={userValues.phone}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="phone"
            onChange={(e) => {
              setUserValues({ ...userValues, phone: e.target.value });
            }}
          />
          <TextField
            id="country"
            label="País"
            value={userValues.country}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="country"
            onChange={(e) => {
              setUserValues({ ...userValues, country: e.target.value });
            }}
          />
          {/* <TextField
            id="password"
            label="Senha"
            name="password"
            variant="outlined"
            type="password"
            error={errorsPassword.password}
            helperText={helperPassword.password}
            onChange={(e) => {
              setUserValues({ ...userValues, password: e.target.value });
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
              setUserValues({
                ...userValues,
                passwordConfirm: e.target.value,
              });
            }}
          /> */}
          <Button
            className="filledButton confirmButton"
            variant="contained"
            type="submit"
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

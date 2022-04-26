import React, { useEffect, useState } from 'react';
import './Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import { Tooltip } from '@mui/material';
import Toast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [userValues, setUserValues] = useState({});

  const fetchUser = async () => {
    try {
      const { user } = await Api.User.findUser();
      setUserValues({
        ...userValues,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
      });
      return user;
    } catch (e) {
      console.error(e);
      Toast.error('Erro ao buscar informações do usuário!');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const editUser = async (event) => {
    event.preventDefault();
    try {
      await Api.User.editUser(userValues);
      Toast.success('Usuário editado com sucesso!');
      navigate('/home/events');
    } catch (e) {
      console.error(e);
      Toast.error('Erro ao editar usuário!');
    }
  };

  return (
    <div className="centeredPageWrapper">
      <div className="PageCard Profile">
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
    </div>
  );
};

export default Profile;

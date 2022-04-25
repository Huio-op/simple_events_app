import React, { useEffect, useState } from 'react';
import './CertificateTemplate.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import { Tooltip } from '@mui/material';
import Toast from '../../utils/Toast';
import Moment from 'moment';
import { useParams } from 'react-router-dom';

const CertificateTemplate = ({ ...props }) => {

  const { id } = useParams();
  const [event, setEvent] = useState({});    
  const [userValues, setUserValues] = useState({});
  const [token, setToken] = useState('');

  const fetchEvent = async () => {
    const event = await Api.Events.findEvent(id);
    setEvent(event);
  };

  const fetchUser = async () => {
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
      Toast.error("Não foi possível pegar as informações do usuário");
    }
  };

  const generateCertificate = async () => {

    try {
      const token  = await Api.Events.findCertificate(id);
      console.log('aaaaaaaaaaaaa', token)
      setToken(token);
    } catch (e) {
      Toast.error("Não foi possível gerar o token");
      console.log(e);
    }

  };

  useEffect(() => {
    fetchUser();
    fetchEvent();
    generateCertificate();
  }, []);

  return (
    <>
      <div className="PageCard">
        <div className="card">
            <h3>Certificado de presença no evento</h3>
            <h6>
                Este certificado garante que {userValues.name} participou no evento
            </h6>
            <h4>{event.name}</h4>
            <h6>Esse evento ocorreu em {Moment(new Date(event.date)).format('DD/MM/YYYY')}</h6>
            <h6>Código único do certificado:</h6>
            <div className="tokenClass">
              <h5>{token}</h5>
            </div>
          </div>
          <Button
            className="filledButton confirmEmailButton"
            variant="contained"
            type="submit"
          >
            Enviar para e-mail
          </Button>
      </div>
    </>
  );
};

export default CertificateTemplate;

import React, { useEffect, useState } from 'react';
import './CertificateTemplate.css';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import Toast from '../../utils/Toast';
import Moment from 'moment';
import { useParams } from 'react-router-dom';

const CertificateTemplate = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [userValues, setUserValues] = useState({});
  const [token, setToken] = useState('');

  const fetchData = async () => {
    try {
      const { user } = await Api.User.findUser();
      setUserValues({
        ...userValues,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
      });
      const event = await Api.Events.findEvent(id);
      setEvent(event);
    } catch (e) {
      Toast.error('Não foi possível buscar as informações do usuário');
    }

    try {
      const { certToken } = await Api.Events.findCertificate(id);
      setToken(certToken);
    } catch (e) {
      Toast.error('Não foi possível gerar o token');
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendToEmail = async () => {
    try {
      await Api.Events.sendCertificate(id);
      Toast.success('Token enviado por email com suesso!');
    } catch (e) {
      Toast.error('Não foi possível enviar o token por email');
      console.error(e);
    }
  };

  return (
    <div className="centeredPageWrapper">
      <div className="PageCard">
        <div className="card">
          <h3>Certificado de presença no evento</h3>
          <h6>
            Este certificado garante que {userValues.name || userValues.email}{' '}
            participou no evento
          </h6>
          <h4>{event.name}</h4>
          <h6>
            Esse evento ocorreu em{' '}
            {Moment(new Date(event.date)).format('DD/MM/YYYY')}
          </h6>
          <h6>Código único do certificado:</h6>
          <div className="tokenClass">
            <h5>{token}</h5>
          </div>
        </div>
        <Button
          className="filledButton confirmEmailButton"
          variant="contained"
          type="submit"
          onClick={sendToEmail}
        >
          Enviar para e-mail
        </Button>
      </div>
    </div>
  );
};

export default CertificateTemplate;

import React, { useEffect, useState } from 'react';
import './CertificateTemplate.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import { Tooltip } from '@mui/material';
import Toast from '../../utils/Toast';

const CertificateTemplate = ({}) => {
    
    const [userValues, setUserValues] = useState({});

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="PageCard">
        <div className="card">
            <h3>Certificado de presença no evento</h3>
            <h6>
                Este certificado garante que {userValues.name} participou no evento
            </h6>
            <h4>Festa a fantasia</h4>
            <h6>Esse evento ocorreu em: 16/04/2022</h6>
            <h6>Código único do certificado:</h6>
            <h5>DAOSIJD8912JD9013J2KD0913KD901J9DIJWI9HDJN</h5>
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

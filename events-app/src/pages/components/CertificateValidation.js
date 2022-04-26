import React, { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';
import Api from '../../api/Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CertificateValidation.css';

const CertificateValidation = () => {
  const [token, setToken] = useState('');
  const [tokenValues, setTokenValues] = useState({ valid: false });

  const validateToken = async () => {
    try {
      const tokenValues = await Api.Events.validateToken(token);
      setTokenValues(tokenValues);
      if (tokenValues.valid) {
        Toast.success('Token é valido!');
      } else {
        Toast.error('Token invalido!');
      }
    } catch (e) {
      Toast.error('Erro ao validar Token!');
    }
  };

  return (
    <div className="CertificateValidation centeredPageWrapper">
      <div className="PageCard">
        <div className="card">
          <TextField
            id="token"
            label="Token de certificado"
            value={token}
            variant="outlined"
            name="token"
            onChange={(e) => {
              setToken(e.target.value);
              setTokenValues({ valid: false });
            }}
          />

          <Button
            className="filledButton"
            variant="contained"
            size="small"
            onClick={validateToken}
          >
            Validar Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateValidation;

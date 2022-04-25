import React, { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';
import Api from '../../api/Api';
import EventCard from '../components/EventCard';

const CertificateValidation = () => {

  return (
    <>
      <div className="PageCard">
          <div className="card">
            <h3>Você não está inscrito em nenhum evento</h3>
            <h6>
              Volte para a página de eventos e se inscreva em algum que você
              gostar
            </h6>
            </div>
            </div>
    </>
  );
};

export default CertificateValidation;

import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import './EventDetailed.css';
import Button from '@mui/material/Button';
import Toast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';

const EventDetailed = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [event, setEvent] = useState({});

  const fetchEvent = async () => {
    const event = await Api.Events.findEvent(id);
    const dataAtual = new Date();
    const eventDate = new Date(event.date);
    event.passed = eventDate < dataAtual;
    setEvent(event);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  const toggleSubscribe = async () => {
    try {
      await Api.Events.toggleSubscribe(event.id, !event.subscribed);
      if (event.subscribed) {
        Toast.success(`Inscrição no evento ${event.name} cancelada!`);
      } else {
        Toast.success(`Inscrição no evento ${event.name} confirmada!`);
      }
      await fetchEvent();
    } catch (e) {
      console.error(e);
      Toast.error('Erro ao confirmar inscrição!');
    }
  };

  const generateCertificate = () => {
    navigate(`/home/certificate/${event.id}`);
  };

  return (
    <div className="centeredPageWrapper">
      <div className="PageCard EventDetailed" style={{ alignItems: 'center' }}>
        <div className="card">
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <div className="ExtraEventInfo">
            <span>
              Marcado para o dia:{' '}
              <strong>
                {Moment(new Date(event.date)).format('DD/MM/YYYY')}
              </strong>
            </span>
            <span>
              Inscrições: <strong>{event.num_atendees}</strong>
            </span>
          </div>
          <div className="ButtonsWrapper">
            <Button
              size="small"
              onClick={onBack}
              className="outlinedButton"
              variant="outlined"
            >
              Voltar
            </Button>
            {(!event.passed || (event.passed && event.subscribed)) && (
              <Button
                className={`${
                  event.subscribed && !event.passed
                    ? 'outlinedButton'
                    : 'filledButton'
                } confirmButton`}
                variant={
                  event.subscribed && !event.passed ? 'outlined' : 'contained'
                }
                size="small"
                onClick={event.passed ? generateCertificate : toggleSubscribe}
              >
                {event.passed
                  ? 'Certificado'
                  : event.subscribed
                  ? 'Desinscrever-se'
                  : 'Inscrever-se'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailed;

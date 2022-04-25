import React, { useState } from 'react';
import './EventCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import Toast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, onToggle }) => {
  const navigate = useNavigate();

  const toggleSubscribe = async () => {
    try {
      await Api.Events.toggleSubscribe(event.id, !event.subscribed);
      if (event.subscribed) {
        Toast.success(`Inscrição no evento ${event.name} cancelada!`);
      } else {
        Toast.success(`Inscrição no evento ${event.name} confirmada!`);
      }
      await onToggle();
    } catch (e) {
      console.error(e);
      Toast.error('Erro ao confirmar inscrição!');
    }
  };

  const showEventDetailed = () => {
    navigate(`/home/events/detailed/${event.id}`);
  };

  const generateCertificate = () => {
    navigate(`/home/certificate/${event.id}`);
  };

  return (
    <>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
        <CardActions>
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
          <Button size="small" onClick={showEventDetailed}>
            Saiba mais
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default EventCard;

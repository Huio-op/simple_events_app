import React, { useState } from 'react';
import './EventCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import Toast from '../../utils/Toast';

const EventCard = ({ title, description, eventId, subscribed, onToggle }) => {
  const toggleSubscribe = async () => {
    try {
      await Api.Events.toggleSubscribe(eventId, !subscribed);
      if (subscribed) {
        Toast.success(`Inscrição no evento ${title} cancelada!`);
      } else {
        Toast.success(`Inscrição no evento ${title} confirmada!`);
      }
      await onToggle();
    } catch (e) {
      console.error(e);
      Toast.error('Erro ao confirmar inscrição!');
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={`${
              subscribed ? 'outlinedButton' : 'filledButton'
            } confirmButton`}
            variant={subscribed ? 'outlined' : 'contained'}
            size="small"
            onClick={toggleSubscribe}
          >
            {subscribed ? 'Desinscrever-se' : 'Inscrever-se'}
          </Button>
          <Button size="small">Saiba mais</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default EventCard;

import React, { useState } from 'react';
import './EventCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const EventCard = ({ title, description }) => {
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
          <Button size="small">Inscrever-se</Button>
          <Button size="small">Saiba mais</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default EventCard;

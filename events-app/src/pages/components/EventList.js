import React, { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';
import Api from '../../api/Api';
import './EventList.css';
import EventCard from '../components/EventCard';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const EventList = ({ subscribed, pastEvents }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    try {
      const dataAtual = new Date();
      let events =
        subscribed || pastEvents
          ? await Api.Events.findSubscribed()
          : await Api.Events.fetchEvents();

      events = events
        .filter((event) => {
          const eventDate = new Date(event.date);
          const hasPassed = eventDate < dataAtual;
          event.passed = hasPassed;
          return pastEvents ? hasPassed : true;
        })
        .sort((a, b) => a.date < b.date);

      if (subscribed) {
        events = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate > dataAtual;
        });
      }

      setEvents(events);
    } catch (e) {
      console.error(e);
      Toast.error(e.response?.data.error.message || 'Erro ao buscar eventos!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [subscribed, pastEvents]);

  const filteredEvents =
    searchTerm !== ''
      ? events.filter((event) => {
          return event.name
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase());
        })
      : events;

  return (
    <>
      <div className="PageCard">
        <Search className="SearchComponent">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            className="SearchInputField"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
          />
        </Search>
        {events.length === 0 && subscribed && (
          <div className="card">
            <h3>Você não está inscrito em nenhum evento</h3>
            <h6>
              Volte para a página de eventos e se inscreva em algum que você
              gostar
            </h6>
          </div>
        )}
        {filteredEvents.map((event, index) => {
          return <EventCard key={index} event={event} onToggle={fetchEvents} />;
        })}
      </div>
    </>
  );
};

export default EventList;

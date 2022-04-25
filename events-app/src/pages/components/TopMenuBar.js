import React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './TopMenuBar.css';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

const TopMenuBar = () => {
  const navigate = useNavigate();

  const hamburguerMenuOpts = [
    {
      label: 'Todos os Eventos',
      onClick: (handleClose) => {
        navigate('/home/events');
        handleClose();
      },
    },
    {
      label: 'Eventos ativos',
      onClick: (handleClose) => {
        navigate('/home/events/subscribed');
        handleClose();
      },
    },
    {
      label: 'Certificados',
      onClick: (handleClose) => {
        navigate('/home/events/certificate');
        handleClose();
      },
    },
  ];

  const profileMenuOpts = [
    {
      label: 'Meu cadastro',
      onClick: (handleClose) => {
        navigate('/home/profile');
        handleClose();
      },
    },
    {
      label: 'Logout',
      onClick: async (handleClose) => {
        await localStorage.removeItem('ACCESS_TOKEN');
        navigate('/login');
        handleClose();
      },
    },
  ];

  const onClickHome = () => {
    navigate('/home');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="AppBar" position="static" color="inherit">
          <Toolbar>
            <DropdownMenu
              items={hamburguerMenuOpts}
              customButton={(open, handleClick) => {
                return (
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="events-menu"
                    sx={{ mr: 2 }}
                    id="events-button"
                    className="eventsMenuClass"
                    aria-controls={open ? 'events-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                );
              }}
            />
            <div className="menuButton" onClick={onClickHome}>
              <Button variant="h6" sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  Home
                </Typography>
              </Button>
            </div>
            <DropdownMenu
              items={profileMenuOpts}
              customButton={(open, handleClick) => {
                return (
                  <div className="profileButton">
                    <Tooltip title="Por favor, complete seu cadastro">
                      <IconButton onClick={() => navigate('/home/profile')}>
                        <ErrorIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      color="inherit"
                      id="basic-button"
                      className="accountButton"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Minha conta
                    </Button>
                  </div>
                );
              }}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default TopMenuBar;

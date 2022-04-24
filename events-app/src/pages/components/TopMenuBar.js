import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DropdownMenu from './DropdownMenu';
import _ from 'lodash';
import './TopMenuBar.css';
import { useNavigate } from 'react-router-dom';

const TopMenuBar = () => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(false);
  const open = !!anchorEl;
  const open2 = !!anchorEl2;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const onClickHome = () => {
    navigate('/home');
  }

  const onClickProfile = () => {
    navigate('/profile');
  }



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="AppBar" position="static" color="inherit">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="events-menu"
              sx={{ mr: 2 }}
              id="events-button"
              className="eventsMenuClass"
              aria-controls={open2 ? 'events-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open2 ? 'true' : undefined}
              onClick={handleClick2}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="events-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                'aria-labelledby': 'events-button',
              }}
            >
              <MenuItem onClick={handleClose2}>Meus Eventos</MenuItem>
              <MenuItem onClick={handleClose2}>Todos os Eventos</MenuItem>
              <MenuItem onClick={handleClose2}>Certificados</MenuItem>
            </Menu>
            <div className="menuButton" onClick={onClickHome}>
            <Button
             variant="h6" sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">Menu</Typography>              
            </Button>
            </div>
            <div className="profileButton">
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
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={onClickProfile}>Meu cadastro</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default TopMenuBar;
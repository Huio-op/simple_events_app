import React, { useState } from 'react';
import './index.css';
import Button from '@mui/material/Button';
import Api from '../../api/Api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(false);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
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

  return (
    <div className="Home homeBackground">
      <div className="PageHeader">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className="AppBar"position="static" color="inherit">
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <Button color="inherit"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Minha conta
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Meu cadastro</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="PageCard">
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Inscrever-se</Button>
            <Button size="small">Saiba mais</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Inscrever-se</Button>
            <Button size="small">Saiba mais</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Home;

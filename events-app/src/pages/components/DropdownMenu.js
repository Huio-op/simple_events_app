import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './TopMenuBar.css';

const DropdownMenu = ({ customButton, items = [] }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const open = !!anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {customButton(open, handleClick)}
      <Menu
        id="events-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'events-button',
        }}
      >
        {items.map((item, key) => {
          return (
            <MenuItem
              key={`${key} MenuItem`}
              onClick={() => item.onClick(handleClose)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default DropdownMenu;

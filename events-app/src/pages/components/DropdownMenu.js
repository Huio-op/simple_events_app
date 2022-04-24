// import React, { useState } from 'react';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// const DropdownMenu = ({ ButtonComponent, options = [] }) => {
//   const [anchorEl, setAnchorEl] = useState(false);
//   const open = !!anchorEl;
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const renderMenuItems = () => {
//     return (
//       <>
//         {options.map((opt) => {
//           return <MenuItem onClick={opt.onClick}>{opt.label}</MenuItem>;
//         })}
//       </>
//     );
//   };

//   return (
//     <>
//       <ButtonComponent
//         aria-controls={open ? 'events-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onCLick={handleClick}
//       ></ButtonComponent>
//       <Menu
//         id="events-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'events-button',
//         }}
//       >
//         {renderMenuItems()}
//       </Menu>
//     </>
//   );
// };

// export default DropdownMenu;

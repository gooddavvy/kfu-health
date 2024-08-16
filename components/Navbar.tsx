"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = ({ sx }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={sx}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KFU Health
        </Typography>
        <LogoutButton />

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <a href="/">Home</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/goals">Goals</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/workouts">Workouts</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/profile">Profile & Settings</a>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

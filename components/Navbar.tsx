"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "./LogoutButton";
import NotificationIcon from "./NotificationIcon";

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
    <Box position="fixed">
      <Box className="ntf-banner green hidden" sx={{ marginTop: "-5px" }}>
        <h4>Affecting</h4>
      </Box>
      <AppBar style={sx}>
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
          <Link href="/notifications">
            <NotificationIcon width={20} height={20} />
          </Link>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/goals">Goals</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/workouts">Workouts</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/profile">Profile & Settings</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

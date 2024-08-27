"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "./LogoutButton";
import NotificationIcon from "./NotificationIcon";
import { getProfileInfo } from "@/utils/profile_api";

const Navbar: React.FC<any> = ({ sx }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [totalPoints, setTotalPoints] = useState<
    number | string | React.ReactNode
  >(
    <CircularProgress
      style={{ color: "#bff", fontSize: "0.875rem !important" }}
    />
  );
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Define the fetch function inside useEffect
    const fetchProfileInfo = async () => {
      try {
        const profileInfo = await getProfileInfo();
        setTotalPoints(profileInfo.total_points);
      } catch (error) {
        console.error("Failed to get profile info:", error);
        setTotalPoints("Error");
      }
    };

    fetchProfileInfo();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box position="fixed">
      <Box className="ntf-banner green hidden" sx={{ mt: "-5px" }}>
        <h4>Affecting</h4>
      </Box>
      <AppBar sx={sx}>
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
          <Box
            sx={{
              border: "2px solid black",
              borderRadius: "2px",
              padding: "6px 16px",
              fontSize: "0.875rem",
            }}
            title={`Total Points Earned: ${totalPoints}`}
          >
            {totalPoints}
          </Box>
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
            <a href="/">
              <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            </a>
            <a href="/goals">
              <MenuItem onClick={handleMenuClose}>Goals</MenuItem>
            </a>
            <a href="/workouts">
              <MenuItem onClick={handleMenuClose}>Workouts</MenuItem>
            </a>
            <a href="/profile">
              <MenuItem onClick={handleMenuClose}>Profile & Settings</MenuItem>
            </a>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

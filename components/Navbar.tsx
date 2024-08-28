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
      style={{ color: "#007bff", fontSize: "0.875rem !important" }}
    />
  );
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Define the fetch function inside useEffect
    const fetchProfileInfo = async () => {
      try {
        const profileInfo = await getProfileInfo();
        setTotalPoints(profileInfo.awards.total_points);
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
              border: "2px solid #1e88e5", // Vibrant blue border for contrast
              borderRadius: "12px", // Rounded corners for a modern look
              padding: "10px 24px", // Increased padding for better spacing
              fontSize: "1rem", // Larger font size for readability
              fontWeight: "bold", // Bold text to make it stand out
              background: "linear-gradient(135deg, #1e88e5, #ff4081, #ffd180)", // Gradient with vibrant colors
              color: "#fff", // White text for contrast against the colorful background
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
              textAlign: "center", // Center the text
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease", // Smooth transitions for all effects
              "&:hover": {
                transform: "rotate(-2deg) scale(1.05)", // Slight rotation and scale on hover for interactivity
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // More pronounced shadow on hover
                background:
                  "linear-gradient(135deg, #ffd180, #ff4081, #1e88e5)", // Reverse gradient on hover
              },
            }}
            title={`Total Points Earned: ${totalPoints}`}
          >
            {typeof totalPoints === "number"
              ? (totalPoints as number).toLocaleString()
              : totalPoints}
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

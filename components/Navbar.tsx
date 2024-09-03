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
    const fetchProfileInfo = async () => {
      try {
        const profileInfo = await getProfileInfo();
        setTotalPoints(
          (profileInfo.awards.total_points as number).toLocaleString()
        );
      } catch (error) {
        console.error("Failed to get profile info:", error);
        setTotalPoints("Error");
      }
    };

    fetchProfileInfo();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box position="fixed" sx={{ width: "100%" }}>
      <AppBar sx={sx}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                border: "2px solid #1e88e5",
                borderRadius: "12px",
                padding: "8px 20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg, #1e88e5, #ff4081, #ffd180)",
                color: "#fff",
                boxShadow: "0 6px 15px rgba(30, 136, 229, 0.5)",
                textAlign: "center",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 0 25px rgba(30, 136, 229, 0.7)",
                  background:
                    "linear-gradient(135deg, #ffd180, #1e88e5, #ff4081)",
                },
                mr: 2,
              }}
              title={`Total Points Earned: ${totalPoints}`}
            >
              {typeof totalPoints === "number" ? totalPoints : totalPoints}
            </Box>

            <LogoutButton />

            {/* Directly use NotificationIcon without IconButton */}
            <Link href="/notifications">
              <NotificationIcon style={{ marginLeft: "16px" }} />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

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
    </Box>
  );
};

export default Navbar;

"use client";

// React
import React, { useState, useEffect, useRef } from "react";

// Components
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import GoalHistory from "../Goal_Console/GoalHistory";
import Trophies from "./Achievements/Trophies";

// Utils
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";

/* Helper code */
export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  return index > -1 && index < array.length ? array.splice(index, 1) : array;
}

export const notify = (message: object, profileI: any) => {
  profileI.notifications.push(message);
  updateProfileInfo(profileI).catch(console.error);
};

/*
 * `Achievements` component
 */
const Achievements: React.FC = () => {
  const [box, setBox] = useState<React.ReactNode>(
    <Box>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );

  useEffect(() => fetchData(), []);
  const fetchData = () => {
    getProfileInfo()
      .then((info) => {
        setBox(
          <Box>
            <Box>
              <p>
                Total Points Earned:{" "}
                {(info.awards.total_points as number).toLocaleString()}
              </p>
            </Box>
            <Box
              sx={{
                border: "1px solid #007bff",
              }}
            >
              <h2 style={{ textAlign: "center" }}>Trophies</h2>
              <Trophies profileInfo={info} />
            </Box>
            <Box>
              <GoalHistory achievedOnly />
            </Box>
          </Box>
        );
      })
      .catch((error) => setBox(<ErrorMessage error={error} />));
  };

  return (
    <Box
      sx={{
        maxWidth: 345,
        minWidth: 435,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        border: "3px solid transparent", // Transparent border
        borderImage: "linear-gradient(lightgreen, darkgreen, blue) 1", // Gradient border
        borderImageSlice: 1, // Ensures the border-image works properly
        borderRadius: "12px", // Rounded corners
        backgroundClip: "border-box", // Clip background to border box
        mt: "1%", // Margin top
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <h2>Accomplished Achievements</h2>
          <p style={{ marginBottom: "3%" }}>
            Not seeing up-to-date information? Please try refreshing the page.
          </p>
          {box}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Achievements;

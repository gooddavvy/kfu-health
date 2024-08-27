import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ProgressBar } from "@carbon/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { isPastDate } from ".././NewGoal/WeightLoss";
import { notify } from "../ActiveGoals";
import GoalSummary from "./GoalSummary";
import { updateProfileInfo } from "@/utils/profile_api";

let GoalDetails: React.FC<any> = ({
  goal,
  profileInfo,
  progress,
  progressColor,
  failing,
  deadlineIsNear,
  onEdit,
  onDelete,
}) => {
  let [errorHasOccurred, setErrorHasOccurred] = useState(false);

  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    if (progress === 100 && !failing && !profileUpdated) {
      const profileI = { ...profileInfo }; // Create a copy of profileInfo
      const addedPoints = 300;
      const notification = {
        message: "You did it! You achieved your goal!",
        details: `Congratulations, ${profileInfo.username}! You have successfully achieved your ${goal.type} goal!`,
        dateAndTime: {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
        goal,
        colorExpression: "lightgreen",
      };

      notify(notification, profileInfo);

      profileI.total_points += addedPoints;
      updateProfileInfo(profileI)
        .then(() => {
          console.log("Successfully added points to profile");
          setProfileUpdated(true);
        })
        .catch((error) => {
          console.error("Error updating profile info:", error);
          setErrorHasOccurred(true);
        });
    }
  }, [progress, failing, profileInfo, goal, profileUpdated]);

  useEffect(() => {
    if (isPastDate(goal.deadline, new Date().toLocaleDateString())) {
      const profileI = { ...profileInfo }; // Create a copy of profileInfo
      profileI.goal_history.push(goal);

      updateProfileInfo(profileI)
        .then(() => {
          console.log("Successfully updated profile info");
        })
        .catch((error) => {
          console.error("Error updating profile info:", error);
          setErrorHasOccurred(true);
        });
    }
  }, [goal, profileInfo]);

  if (!errorHasOccurred) {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = window.location.href;
      }
    }, 1000);

    clearTimeout(timer);
  }

  return (
    <>
      <Box
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "grid",
        }}
      >
        <p style={{ fontSize: "100%", color: progressColor }}>
          Progress: {progress.toFixed(2)}% (Progress Level:{" "}
          {progress < 50 ? "Low" : progress < 75 ? "Medium" : "High"})
        </p>
        <ProgressBar label="" value={progress} max={100} status="active" />
      </Box>
      {progress === 0 && (
        <Box sx={{ textAlign: "center", color: "#721c24", mt: "5px" }}>
          <p>No progress made yet</p>
        </Box>
      )}
      {progress === 100 && !failing && (
        <Box sx={{ textAlign: "center", color: "green", mt: "5px" }}>
          <p>You did it! You achieved your goal! Please delete the goal now.</p>
        </Box>
      )}
      {deadlineIsNear && progress !== 100 && (
        <Box sx={{ textAlign: "center", fontWeight: "bold", mt: "5px" }}>
          <p>
            <b>
              <i>Deadline approaching soon.</i>
            </b>
          </p>
        </Box>
      )}
      {failing && (
        <Box sx={{ textAlign: "center", color: "darkred", mt: "5px" }}>
          <p>Oh no, you failed this goal!</p>
        </Box>
      )}
      <GoalSummary goal={goal} />
      <Box style={{ marginTop: "2%" }}>
        <IconButton onClick={onEdit} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} sx={{ color: "#da1e28" }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default GoalDetails;

import React from "react";
import { Box } from "@mui/material";

export default function GoalInfo({ notification }: any): React.ReactNode {
  return (
    <Box>
      <h4>Goal Info (for Reference)</h4>
      <p>
        <b>Type:</b> {notification.goal.type}
      </p>
      <p>
        <b>Start Date:</b> {notification.goal.startDate}
      </p>
      <p>
        <b>Deadline:</b> {notification.goal.deadline}
      </p>
      <p>
        <b>Initial Value:</b>{" "}
        {notification.goal.initialWeight || notification.goal.initialMaxPushups}
      </p>
      <p>
        <b>Target:</b>{" "}
        {notification.goal.targetWeight || notification.goal.targetMaxPushups}
      </p>
    </Box>
  );
}

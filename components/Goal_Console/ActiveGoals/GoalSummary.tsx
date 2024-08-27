import React from "react";
import { Box } from "@mui/material";

let GoalSummary: React.FC<any> = ({ goal }) => (
  <Box>
    <p>
      <b>Goal Type:</b> {goal.type}
    </p>
    <p>
      <b>Start Date:</b> {goal.startDate}
    </p>
    <p>
      <b>Current Date:</b> {new Date().toLocaleDateString()}
    </p>
    <p>
      <b>Deadline:</b> {goal.deadline}
    </p>
    {goal.initialWeight && goal.currentWeight && goal.targetWeight && (
      <Box>
        <p>
          <b>Initial Weight:</b> {goal.initialWeight} lb
        </p>
        <p>
          <b>Current Weight:</b> {goal.currentWeight} lb
        </p>
        <p>
          <b>Target Weight:</b> {goal.targetWeight} lb
        </p>
      </Box>
    )}
    {goal.initialMaxPushups &&
      goal.currentMaxPushups &&
      goal.targetMaxPushups && (
        <Box>
          <p>
            <b>Initial Maximum Pushups:</b> {goal.initialMaxPushups}
          </p>
          <p>
            <b>Current Maximum Pushups:</b> {goal.currentMaxPushups}
          </p>
          <p>
            <b>Target Maximum Pushups:</b> {goal.targetMaxPushups}
          </p>
        </Box>
      )}
    {goal.initialMaxPullups &&
      goal.currentMaxPullups &&
      goal.targetMaxPullups && (
        <Box>
          <p>
            <b>Initial Maximum Pull-ups:</b> {goal.initialMaxPullups}
          </p>
          <p>
            <b>Current Maximum Pull-ups:</b> {goal.currentMaxPullups}
          </p>
          <p>
            <b>Target Maximum Pull-ups:</b> {goal.targetMaxPullups}
          </p>
        </Box>
      )}
  </Box>
);

export default GoalSummary;

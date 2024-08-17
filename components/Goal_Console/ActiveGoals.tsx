"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProgressBar } from "@carbon/react";
import { Property } from "csstype";
import { getProfileInfo, updateProfileInfo } from "../../utils/profile_api";
import { isPastDate } from "./NewGoal/WeightLoss";

export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  if (index > -1 && index < array.length) {
    array.splice(index, 1);
  } else {
    console.error("Index out of bounds");
  }
  return array;
}

const ActiveGoals: React.FC = ({ sx }: any) => {
  const [box, setBox] = useState(
    <Box>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );
  const goalRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  // Updated function to calculate progress based on weight
  const calculateProgress = (
    initial: number,
    current: number,
    target: number
  ): number => {
    if (initial === target) {
      return 100; // Goal was already achieved at the start
    }

    // Determine if the goal is to lose or gain
    const isLosing = initial > target;

    let progress;

    if (isLosing) {
      // Calculate progress for loss
      const totalToLose = initial - target;
      const LostSoFar = initial - current;
      progress = (LostSoFar / totalToLose) * 100;
    } else {
      // Calculate progress for gain
      const totalToGain = target - initial;
      const GainedSoFar = current - initial;
      progress = (GainedSoFar / totalToGain) * 100;
    }

    // Ensure the progress is between 0 and 100
    return Math.min(Math.max(progress, 0), 100);
  };

  useEffect(() => {
    getProfileInfo()
      .then((profileInfo) => {
        const activeGoals = profileInfo.goals.filter(
          (goal: any) => goal.active
        );

        const handleEdit = (index: number, newGoal: Object) => {
          let profileI = profileInfo;
          profileI.goals[index] = newGoal;

          updateProfileInfo(profileI)
            .then(() => console.log("Successfully edited"))
            .catch((error) => console.error(error));
        };

        const handleDelete = (index: number) => {
          let profileI = profileInfo;
          removeElementAtIndex(profileI.goals, index);

          updateProfileInfo(profileI)
            .then(() => console.log("Successfully edited"))
            .catch((error) => console.error(error));
        };

        if (activeGoals.length === 0) {
          setBox(
            <Box>
              <p>
                <b>Whoops, no active goals yet.</b> But we asked you if you were
                ready to reach some goals. Remember, discipline equals freedom,
                so go and make a new goal!
              </p>
            </Box>
          );
        } else {
          // Initialize refs for each goal
          goalRefs.current = activeGoals.map(
            (_: any, i: number) => goalRefs.current[i] || React.createRef()
          );

          setBox(
            <Box>
              {activeGoals.map((goal: any, index: number) => {
                const progress = calculateProgress(
                  goal.initialWeight || goal.initialMaxPushups,
                  goal.currentWeight || goal.currentMaxPushups,
                  goal.targetWeight || goal.targetMaxPushups
                );
                let failing =
                  isPastDate(goal.deadline, goal.startDate) ||
                  (progress === 0 && isPastDate(goal.deadline, goal.startDate));

                return (
                  <div
                    key={index}
                    ref={goalRefs.current[index]} // Attach ref to the div
                    style={{
                      border: "1.5px dashed",
                      borderRadius: "12px",
                      padding: "10px",
                      margin: "10px 0",
                      backgroundColor: failing ? "#f8d7da" : "inherit", // Light red background when empty
                    }}
                  >
                    <Box
                      style={{
                        textAlign: "center" as Property.TextAlign,
                        justifyContent: "center",
                        display: "grid",
                      }}
                    >
                      <ProgressBar
                        label={`Progress: ${progress.toFixed(2)}%`}
                        value={progress}
                        max={100}
                      />
                    </Box>
                    {progress === 0 && (
                      <Box
                        sx={{
                          textAlign: "center",
                          color: "#721c24",
                          marginTop: "5px",
                        }}
                      >
                        <p>No progress made yet</p>
                      </Box>
                    )}
                    {progress === 100 && failing === false && (
                      <Box
                        sx={{
                          textAlign: "center",
                          color: "green",
                          marginTop: "5px",
                        }}
                      >
                        <p>You did it! You achieved your goal!</p>
                      </Box>
                    )}
                    {failing && (
                      <Box
                        sx={{
                          textAlign: "center",
                          color: "darkred",
                          marginTop: "5px",
                        }}
                      >
                        <p>Oh no, you're failing this goal!</p>
                      </Box>
                    )}
                    <Box style={{ marginTop: "2%" }}>
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
                      <Box>
                        {goal.initialWeight &&
                          goal.currentWeight &&
                          goal.targetWeight && (
                            <Box>
                              <p>
                                <b>Initial Weight:</b> {goal.initialWeight}
                              </p>
                              <p>
                                <b>Current Weight:</b> {goal.currentWeight}
                              </p>
                              <p>
                                <b>Target Weight:</b> {goal.targetWeight}
                              </p>
                            </Box>
                          )}
                        {goal.initialMaxPushups &&
                          goal.currentMaxPushups &&
                          goal.targetMaxPushups && (
                            <Box>
                              <p>
                                <b>Initial Maximum Pushups:</b>{" "}
                                {goal.initialMaxPushups}
                              </p>
                              <p>
                                <b>Current Maximum Pushups:</b>{" "}
                                {goal.currentMaxPushups}
                              </p>
                              <p>
                                <b>Target Maximum Pushups:</b>{" "}
                                {goal.targetMaxPushups}
                              </p>
                            </Box>
                          )}
                      </Box>
                      <IconButton
                        onClick={() => {
                          let newGoal = goal;
                          let newDeadline = prompt(
                            "Please enter a new deadline, otherwise leave the field empty."
                          );
                          if (newDeadline !== "") {
                            newGoal.deadline = newDeadline;
                          }

                          let newCurrent = prompt(
                            "Please enter your current value, otherwise leave the field empty."
                          );
                          if (newCurrent !== "") {
                            newGoal.currentWeight &&
                              (newGoal.currentWeight = newCurrent);
                            newGoal.currentMaxPushups &&
                              (newGoal.currentMaxPushups = newCurrent);
                          }

                          let newTarget = prompt(
                            "Please enter a new target, otherwise leave the field empty."
                          );
                          if (newTarget !== "") {
                            newGoal.target && (newGoal.target = newTarget);
                            newGoal.targetMaxPushups &&
                              (newGoal.targetMaxPushups = newTarget);
                          }

                          handleEdit(index, newGoal);
                          alert(
                            "Please refresh the page for up-to-date results."
                          );
                        }}
                        color="primary"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          let sureToDelete = prompt(
                            "Are you sure you want to delete this goal? This action is irreversible! (y/n)"
                          );
                          if (sureToDelete?.toLowerCase() === "y") {
                            handleDelete(index);
                          }
                          alert(
                            "Deleted. Please refresh the page for up-to-date information."
                          );
                        }}
                        color="secondary"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </div>
                );
              })}
            </Box>
          );
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve active goals:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Box
      sx={{
        maxWidth: 345,
        textAlign: "center !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        border: "3px solid red",
        borderRadius: "5px",
        borderWidth: "2px",
        marginTop: "1%",
      }}
    >
      <Card variant="outlined" sx={{}}>
        <CardContent>
          <h2>Active Goals</h2>
          <p style={{ marginBottom: "3% !important" }}>
            Not seeing up-to-date information? Please try refreshing the page.
          </p>
          {box}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveGoals;

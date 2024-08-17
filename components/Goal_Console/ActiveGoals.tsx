"use client";

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProgressBar } from "@carbon/react";
import { Property } from "csstype";
import { getProfileInfo, updateProfileInfo } from "../../utils/profile_api";

const ActiveGoals: React.FC = ({ sx }: any) => {
  const [box, setBox] = useState(
    <Box>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );

  // Updated function to calculate progress based on weight
  const calculateProgress = (
    initialWeight: number,
    currentWeight: number,
    targetWeight: number
  ): number => {
    if (initialWeight === targetWeight) {
      return 100; // Goal was already achieved at the start
    }

    // Determine if the goal is to lose or gain weight
    const isLosingWeight = initialWeight > targetWeight;

    let progress;

    if (isLosingWeight) {
      // Calculate progress for weight loss
      const totalWeightToLose = initialWeight - targetWeight;
      const weightLostSoFar = initialWeight - currentWeight;
      progress = (weightLostSoFar / totalWeightToLose) * 100;
    } else {
      // Calculate progress for weight gain
      const totalWeightToGain = targetWeight - initialWeight;
      const weightGainedSoFar = currentWeight - initialWeight;
      progress = (weightGainedSoFar / totalWeightToGain) * 100;
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

        if (activeGoals.length === 0) {
          setBox(
            <Box>
              <p>Whoops, no active goals yet</p>
            </Box>
          );
        } else {
          setBox(
            <Box>
              {activeGoals.map((goal: any, index: number) => {
                // Use the updated calculateProgress function
                const progress = calculateProgress(
                  goal.initialWeight,
                  goal.currentWeight,
                  goal.targetWeight
                );

                return (
                  <div
                    key={index}
                    style={{
                      border: "1.5px dashed",
                      borderRadius: "12px",
                      padding: "10px",
                      margin: "10px 0",
                      backgroundColor: progress === 0 ? "#f8d7da" : "inherit", // Light red background when empty
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
                        style={{
                          textAlign: "center",
                          color: "#721c24",
                          marginTop: "5px",
                        }}
                      >
                        <p>No progress made yet</p>
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
                        <b>Deadline:</b> {goal.deadline}
                      </p>
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
                      <IconButton
                        onClick={() => {
                          let newGoal = goal;
                          let newDeadline = prompt(
                            "Please enter a new deadline, otherwise leave the field empty."
                          );
                          if (newDeadline !== "") {
                            newGoal.deadline = newDeadline;
                          }

                          let newCurrentWeight = prompt(
                            "Please enter your current weight, otherwise leave the field empty."
                          );
                          if (newCurrentWeight !== "") {
                            newGoal.currentWeight = newCurrentWeight;
                          }

                          let newTargetWeight = prompt(
                            "Please enter a new target weight, otherwise leave the field empty."
                          );
                          if (newTargetWeight !== "") {
                            newGoal.targetWeight = newTargetWeight;
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
          <p>
            Not seeing up-to-date information? Please try refreshing the page.
          </p>
          {box}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveGoals;

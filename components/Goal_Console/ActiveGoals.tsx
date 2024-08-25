"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
  Button as MuiButton,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button as CarbonButton, ProgressBar } from "@carbon/react";
import { getProfileInfo, updateProfileInfo } from "../../utils/profile_api";
import { isPastDate } from "./NewGoal/WeightLoss";
import isNearDeadline from "../../utils/is_near_deadline";

export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  return index > -1 && index < array.length ? array.splice(index, 1) : array;
}

export const notify = (message: object, profileI: any) => {
  profileI.notifications.push(message);
  updateProfileInfo(profileI).catch(console.error);
};

const ActiveGoals: React.FC = () => {
  const [box, setBox] = useState<React.ReactNode>(
    <Box>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentGoalIndex, setCurrentGoalIndex] = useState<number | null>(null);

  const [currentGoal, setCurrentGoal] = useState<any>(null);

  const [editFields, setEditFields] = useState<{
    deadline?: string;
    current?: string;
    target?: string;
  }>({});
  const goalRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getProfileInfo()
      .then(updateGoals)
      .catch(() =>
        setBox(
          <Box>
            <p>Something went wrong. Please try again later.</p>
          </Box>
        )
      );
  };

  const calculateProgress = (
    initial: number,
    current: number,
    target: number
  ) =>
    Math.min(
      Math.max(
        ((initial > target ? initial - current : current - initial) /
          Math.abs(target - initial)) *
          100,
        0
      ),
      100
    );

  const updateGoals = (profileInfo: any) => {
    const activeGoals = profileInfo.goals.filter((goal: any) => goal.active);
    goalRefs.current = activeGoals.map(
      (_: any, i: number) => goalRefs.current[i] || React.createRef()
    );
    setBox(
      <Box>
        {activeGoals.length ? (
          activeGoals.map((goal: any, index: number) => {
            const progress = calculateProgress(
              goal.initialWeight ||
                goal.initialMaxPushups ||
                goal.initialMaxPullups,
              goal.currentWeight ||
                goal.currentMaxPushups ||
                goal.currentMaxPullups,
              goal.targetWeight ||
                goal.targetMaxPushups ||
                goal.targetMaxPullups
            );
            const failing =
              isPastDate(goal.deadline, goal.startDate) ||
              (progress === 0 && isPastDate(goal.deadline, goal.startDate));

            return (
              <div
                key={index}
                ref={goalRefs.current[index]}
                style={{
                  border: "1.5px dashed",
                  borderRadius: "12px",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: failing ? "#f8d7da" : "inherit",
                }}
              >
                <GoalDetails
                  goal={goal}
                  profileInfo={profileInfo}
                  progress={progress}
                  progressColor={
                    progress < 50 ? "red" : progress < 75 ? "blue" : "green"
                  }
                  failing={failing}
                  deadlineIsNear={isNearDeadline(new Date(goal.deadline))}
                  onEdit={() => openEditGoalModal(index, goal)}
                  onDelete={() => openDeleteGoalModal(index)}
                />
              </div>
            );
          })
        ) : (
          <Box>
            <p>
              <b>Whoops, no active goals yet.</b> Remember, discipline equals
              freedom, so go and make a new goal!
            </p>
          </Box>
        )}
      </Box>
    );
  };

  const handleEdit = (index: number) => {
    getProfileInfo()
      .then((profileInfo) => {
        profileInfo.goals[index] = {
          ...profileInfo.goals[index],
          ...editFields,
        };
        updateProfileInfo(profileInfo).then(() => fetchData());
      })
      .catch(console.error);
    closeModals();
  };

  const handleDelete = (index: number) => {
    getProfileInfo()
      .then((profileInfo) => {
        removeElementAtIndex(profileInfo.goals, index);
        updateProfileInfo(profileInfo).then(() => fetchData());
      })
      .catch(console.error);
    closeModals();
  };

  const openDeleteGoalModal = (index: number) => {
    setCurrentGoalIndex(index);
    setOpenDeleteModal(true);
  };
  const openEditGoalModal = (index: number, goal: any) => {
    setCurrentGoal(goal); // Set the current goal
    setCurrentGoalIndex(index);
    setEditFields({
      deadline: goal.deadline,
      current:
        goal.currentWeight ||
        goal.currentMaxPushups ||
        goal.currentMaxPullups ||
        "",
      target:
        goal.targetWeight ||
        goal.targetMaxPushups ||
        goal.targetMaxPullups ||
        "",
    });
    setOpenEditModal(true);
  };

  const closeModals = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setCurrentGoalIndex(null);
    setEditFields({});
  };

  return (
    <Box
      sx={{
        maxWidth: 345,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        border: "3px solid red",
        borderRadius: "5px",
        borderWidth: "2px",
        marginTop: "1%",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <h2>Active Goals</h2>
          <p style={{ marginBottom: "3%" }}>
            Not seeing up-to-date information? Please try refreshing the page.
          </p>
          {box}
        </CardContent>
      </Card>

      <Modal open={openDeleteModal} onClose={closeModals}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Confirm Delete
          </Typography>
          <p>
            Are you sure you want to delete this goal? This action is
            irreversible!
          </p>

          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <CarbonButton
              onClick={() => handleDelete(currentGoalIndex!)}
              kind="danger"
            >
              Delete Goal
            </CarbonButton>
            <MuiButton
              onClick={closeModals}
              variant="text"
              sx={{
                marginTop: 0.5,
                borderBottom: "1px solid transparent",
                "&:hover": { borderBottom: "1px solid" },
                "&:focus": { borderBottom: "1px solid" },
              }}
            >
              Cancel
            </MuiButton>
          </Box>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={closeModals}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <h2>Edit Goal</h2>
          <TextField
            label="Deadline"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFields.deadline}
            onChange={(e) =>
              setEditFields((prev) => ({ ...prev, deadline: e.target.value }))
            }
          />
          <TextField
            label="Current Value"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFields.current}
            onChange={(e) =>
              setEditFields((prev) => {
                const currentKey =
                  currentGoal.currentWeight !== undefined
                    ? "currentWeight"
                    : currentGoal.currentMaxPushups !== undefined
                    ? "currentMaxPushups"
                    : "currentMaxPullups";
                return {
                  ...prev,
                  current: e.target.value,
                  [currentKey]: e.target.value,
                };
              })
            }
          />
          <TextField
            label="Target Value"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFields.target}
            onChange={(e) =>
              setEditFields((prev) => {
                const targetKey =
                  currentGoal.targetWeight !== undefined
                    ? "targetWeight"
                    : currentGoal.targetMaxPushups !== undefined
                    ? "targetMaxPushups"
                    : "targetMaxPullups";
                return {
                  ...prev,
                  target: e.target.value,
                  [targetKey]: e.target.value,
                };
              })
            }
          />

          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <CarbonButton
              onClick={() => handleEdit(currentGoalIndex!)}
              kind="primary"
            >
              Save Changes
            </CarbonButton>
            <MuiButton
              onClick={closeModals}
              variant="text"
              sx={{
                marginTop: 0.5,
                borderBottom: "1px solid transparent",
                "&:hover": { borderBottom: "1px solid" },
                "&:focus": { borderBottom: "1px solid" },
              }}
            >
              Cancel
            </MuiButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const GoalDetails: React.FC<any> = ({
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

  if (progress === 100 && failing === false) {
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
  }
  if (isPastDate(goal.deadline, new Date().toLocaleDateString())) {
    // This means that today is pass the deadline. Here's the logic.
    let profileI = profileInfo;
    profileI.goal_history.push(goal);

    updateProfileInfo(profileI)
      .then((_) => {
        console.log("Successfully updated profile info");
      })
      .catch((error) => {
        console.error("Error updating profile info:", error);
        setErrorHasOccurred(true);
      });

    if (!errorHasOccurred) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = window.location.href;
        }
      }, 1000);
    }
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
        <Box sx={{ textAlign: "center", color: "#721c24", marginTop: "5px" }}>
          <p>No progress made yet</p>
        </Box>
      )}
      {progress === 100 && !failing && (
        <Box sx={{ textAlign: "center", color: "green", marginTop: "5px" }}>
          <p>You did it! You achieved your goal! Please delete the goal now.</p>
        </Box>
      )}
      {deadlineIsNear && progress !== 100 && (
        <Box sx={{ textAlign: "center", fontWeight: "bold", marginTop: "5px" }}>
          <p>
            <b>
              <i>Deadline approaching soon.</i>
            </b>
          </p>
        </Box>
      )}
      {failing && (
        <Box sx={{ textAlign: "center", color: "darkred", marginTop: "5px" }}>
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

const GoalSummary: React.FC<any> = ({ goal }) => (
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

export default ActiveGoals;

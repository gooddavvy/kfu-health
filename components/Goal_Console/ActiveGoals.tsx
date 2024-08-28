"use client";

// React
import React, { useState, useEffect, useRef } from "react";

// Components
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import { Button as CarbonButton } from "@carbon/react";
import GoalDetails from "./ActiveGoals/GoalDetails";
import ErrorMessage from "../ErrorMessage";

// Utils
import { isPastDate } from "./NewGoal/WeightLoss";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import isNearDeadline from "@/utils/is_near_deadline";
import calculateProgress from "@/utils/calculate_progress";

/* Helper code */
export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  return index > -1 && index < array.length ? array.splice(index, 1) : array;
}

export const notify = (message: object, profileI: any) => {
  profileI.notifications.push(message);
  updateProfileInfo(profileI).catch(console.error);
};

/*
 * `ActiveGoals` component
 */
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

  useEffect(() => fetchData(), []);
  const fetchData = () => {
    getProfileInfo()
      .then(updateGoals)
      .catch((error) => setBox(<ErrorMessage error={error} />));
  };

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
        mt: "1%",
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

          <Box sx={{ mt: "20px" }}>
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
                mt: 0.5,
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

          <Box sx={{ mt: "20px" }}>
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
                mt: 0.5,
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

export default ActiveGoals;

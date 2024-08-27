"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { Property } from "csstype";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import { removeElementAtIndex } from "@/components/Goal_Console/ActiveGoals";
import GoalInfo from "./GoalInfo";

const Notifications: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    getProfileInfo()
      .then((profileInfo: any) => {
        setUsername(", " + profileInfo.username);
        setNotifications(profileInfo.notifications.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to get profile info:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    if (deleteIndex === null) return;

    getProfileInfo()
      .then((profileInfo: any) => {
        removeElementAtIndex(profileInfo.notifications, deleteIndex);
        return updateProfileInfo(profileInfo);
      })
      .then(() => {
        // Update local state after successful deletion
        setNotifications((prevNotifications) =>
          prevNotifications.filter((_, i) => i !== deleteIndex)
        );
        setOpenModal(false); // Close the modal after deletion
        setDeleteIndex(null); // Reset the index
      })
      .catch((error) => console.error("Error deleting notification:", error));
  };

  const handleOpenModal = (index: number) => {
    setDeleteIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDeleteIndex(null);
  };

  const renderNotifications = () => {
    if (loading) {
      return (
        <Box
          sx={{
            justifySelf: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            border: "2px solid",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginBottom: "1%" }}>Loading list...</h3>
          <CircularProgress style={{ color: "#007bff" }} />
        </Box>
      );
    }

    if (notifications.length === 0)
      return (
        <Box
          sx={{
            justifySelf: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            border: "2px solid",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginBottom: "1%" }}>You're all caught up!</h3>
          <p>
            You haven't made more progress yet. But remember, discipline equals
            freedom. Go and <a href="/">make some progress!</a>
          </p>
        </Box>
      );

    return (
      <Box
        sx={{
          justifySelf: "center",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          border: "2px solid",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ marginBottom: "1%" }}>
          Here's a list of your notifications.
        </h3>
        {notifications.map((notification: any, index: number) => (
          <div
            style={{
              border: "1.5px dashed",
              borderRadius: "12px",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: notification.colorExpression,
            }}
            key={index}
          >
            <Box
              style={{
                textAlign: "center" as Property.TextAlign,
                justifyContent: "center",
                display: "grid",
              }}
            >
              <h4>{notification.message}</h4>
              <p>{notification.details}</p>
              <p>
                <b>Date:</b> {notification.dateAndTime.date}
              </p>
              <p>
                <b>Time:</b> {notification.dateAndTime.time}
              </p>
              {notification.goal && <GoalInfo notification={notification} />}
              <IconButton
                onClick={() => handleOpenModal(index)}
                color="primary"
                aria-label="delete"
                sx={{ fontSize: "16px" }}
              >
                <DeleteIcon />
                Delete Notification
              </IconButton>
            </Box>
          </div>
        ))}
      </Box>
    );
  };

  return (
    <main>
      <h1>Notifications</h1>
      <p>Let's see what you've achieved{username}.</p>
      {renderNotifications()}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="modal-for-deletion-confirmation"
      >
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
          <h2 id="delete-confirmation-modal">Confirm Deletion</h2>
          <p>
            Are you sure you want to delete this notification? This action is
            irreversible!
          </p>
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#da1e28" }}
              onClick={handleDelete}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </main>
  );
};

export default Notifications;

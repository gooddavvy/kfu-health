"use client";

import React, { useState } from "react";
// import { cookies } from "next/headers";
import { Box, CircularProgress } from "@mui/material";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Property } from "csstype";
import { getProfileInfo } from "../../utils/profile_api";

export default function Notifications() {
  //   const cookieStore = cookies();
  //   const authToken = cookieStore.get("auth")?.value;
  let [username, setUsername] = useState<string>("");
  let [notificationListComponent, setNotificationListComponent] =
    useState<React.ReactNode>(
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

  getProfileInfo()
    .then((profileInfo: any) => {
      let profileUsername = profileInfo.username;
      let notifications = profileInfo.notifications;

      notifications = notifications.slice().reverse();

      setUsername(profileUsername);
      if (notifications.length === 0) {
        setNotificationListComponent(
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
              You haven't made more progress yet. But remember, discipline
              equals freedom. Go and <Link href="/">make some progress!</Link>
            </p>
          </Box>
        );
      } else {
        setNotificationListComponent(
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
            {notifications.map((notification: any, index: number) => {
              return (
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
                  </Box>
                </div>
              );
            })}
          </Box>
        );
      }
    })
    .catch((error) => {
      console.error("Failed to get profile info:", error);
    });

  /* if (!authToken) {
    // Redirect to login page if not authenticated
    redirect("/auth/login");
  } */

  return (
    <main>
      <h1>Notifications</h1>
      <p>Let's see what you've achieved, {username}.</p>
      {notificationListComponent}
    </main>
  );
}

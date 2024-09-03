"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getProfileInfo } from "@/utils/profile_api";
import ErrorMessage from "../ErrorMessage";

const YourProfile: React.FC<any> = ({ sx }: any) => {
  const router = useRouter();

  let [profile, setProfile] = useState<any>();
  let [infoBox, setInfoBox] = useState<React.ReactNode>(
    <Box>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );

  useEffect(() => {
    getProfileInfo()
      .then((profileInfo) => {
        setProfile(profileInfo);
        setInfoBox(
          <Box>
            <Box>
              <p>
                <b style={{ fontWeight: "bold !important" }}>Username:</b>{" "}
                {profileInfo.username}
              </p>
              <p>
                <b style={{ fontWeight: "bold !important" }}>
                  Total Points Earned:
                </b>{" "}
                {(profileInfo.awards.total_points as number).toLocaleString()}
              </p>
            </Box>
            <Box>
              <IconButton
                color="primary"
                onClick={() => router.push("/profile-info")}
                sx={{ fontSize: "16px" }}
              >
                <EditIcon /> Edit Profile
              </IconButton>
            </Box>
          </Box>
        );
      })
      .catch((error) => {
        console.error("Error getting profile:", error);
        setInfoBox(<ErrorMessage error={error} />);
      });
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center !important",
        border: "3px solid",
        borderRadius: "5px !important",
        borderWidth: "2px !important",
        mt: "1%",
        maxWidth: 345,
        minWidth: 435,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center" /* 
        marginLeft: "40%",
        marginRight: "10%", */,
        ...sx,
      }}
    >
      <h2>Your Profile</h2>
      {infoBox}
    </Box>
  );
};

export default YourProfile;

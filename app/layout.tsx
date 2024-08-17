"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import { CssBaseline } from "@mui/material"; // Material UI baseline
import { Box, Modal } from "@mui/material";
import { Global, css } from "@emotion/react";
import "@carbon/styles/css/styles.css"; // Carbon styles
import "@carbon/styles/css/styles.min.css"; // Carbon styles
import "./styles.css"; // My own custom styles

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  updateProfileInfo(getProfileInfo());

  return (
    <html lang="en">
      <head>
        <title>KFU Health</title>
      </head>
      <CssBaseline />
      <Global
        styles={css`
          .cds--progress-bar__fill {
            background-color: green !important;
          }

          /* Increase specificity if the above doesn't work */
          html.cds--progress-bar__fill {
            background-color: green !important;
          }
        `}
      />
      <body className={inter.className}>
        <div style={{ marginTop: "20px", marginBottom: "68px" }}>
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}

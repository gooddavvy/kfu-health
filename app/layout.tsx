import React from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import { CssBaseline } from "@mui/material"; // Material UI baseline
import "@carbon/styles/css/styles.css"; // Carbon styles
import "@carbon/styles/css/styles.min.css"; // Carbon styles

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
        <title>Dashboard \ KFU Health</title>
      </head>
      <CssBaseline />
      <body className={inter.className}>
        <div style={{ marginBottom: "20px" }}>
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}

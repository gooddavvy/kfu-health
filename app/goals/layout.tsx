import React from "react";
import { Inter } from "next/font/google";
import "@carbon/styles/css/styles.css"; // Carbon styles
import "@carbon/styles/css/styles.min.css"; // Carbon styles

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Goal Console \ KFU Health</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

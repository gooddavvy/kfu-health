"use client";

import React, { useState } from "react";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfileInfo } from "@/utils/profile_api";
import YourProfile from "@/components/Dashboard/YourProfile";
import QuoteComponent from "@/components/QuoteComponent";
import { GenerateQuote } from "@/utils/quote_manager";

export default function Home() {
  /* const cookieStore = cookies();
  const authToken = cookieStore.get("auth")?.value; */

  const [username, setUsername] = useState<string>("");

  getProfileInfo()
    .then((profileInfo: any) => {
      setUsername(", " + profileInfo.username);
    })
    .catch((error: any) => {
      console.error("Failed to get profile info:", error);
    });

  /* if (!authToken) {
    // Redirect to login page if not authenticated
    // redirect("/auth/login");
  } */

  return (
    <main>
      <h1>KFU Health Dashboard</h1>
      <p>Welcome back{username}.</p>
      <QuoteComponent quote={GenerateQuote()} />

      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <YourProfile />
      </section>
    </main>
  );
}

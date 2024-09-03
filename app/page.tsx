"use client";

import React, { useState } from "react";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* Util imports */
import { getProfileInfo } from "@/utils/profile_api";
import { GenerateQuote } from "@/utils/quote_manager";

/* Component imports */
import YourProfile from "@/components/Dashboard/YourProfile";
import Achievements from "@/components/Dashboard/Achievements";
import QuoteComponent from "@/components/QuoteComponent";
import ErrorMessage from "@/components/ErrorMessage";

/* Component */
export default function Home() {
  /* const cookieStore = cookies();
  const authToken = cookieStore.get("auth")?.value; */

  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  getProfileInfo()
    .then((profileInfo: any) => {
      setUsername(", " + profileInfo.username);
    })
    .catch((error: Error) => {
      console.error("Failed to get profile info:", error);
      setError(error);
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
      {error && <ErrorMessage error={error} />}

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
      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <Achievements />
      </section>
    </main>
  );
}

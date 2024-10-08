"use client";

import React, { useState } from "react";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfileInfo } from "@/utils/profile_api";
import NewGoal from "@/components/Goal_Console/NewGoal";
import ActiveGoals from "@/components/Goal_Console/ActiveGoals";
import GoalHistory from "@/components/Goal_Console/GoalHistory";
import ErrorMessage from "@/components/ErrorMessage";

export default function Goals() {
  //   const cookieStore = cookies();
  //   const authToken = cookieStore.get("auth")?.value;
  const [username, setUsername] = useState("");
  const [error, setError] = useState<Error | null>(null);

  getProfileInfo()
    .then((profileInfo: any) => {
      setUsername(", " + profileInfo.username);
    })
    .catch((error) => {
      console.error("Failed to get profile info:", error);
      setError(error);
    });

  /* if (!authToken) {
    // Redirect to login page if not authenticated
    redirect("/auth/login");
  } */

  return (
    <main>
      <h1>Goal Console</h1>
      <p>Ready to reach some goals{username}?</p>
      {error && <ErrorMessage error={error} />}

      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <NewGoal />
      </section>
      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <ActiveGoals />
      </section>
      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <GoalHistory />
      </section>
    </main>
  );
}

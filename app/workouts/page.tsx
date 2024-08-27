"use client";

import React from "react";
// import { cookies } from "next/headers"; // Should not be uncommented
import { redirect } from "next/navigation";
import { getProfileInfo } from "@/utils/profile_api";
import NewWorkout from "@/components/Workout_Tracker/WorkoutLogging";

export default function Goals() {
  //   const cookieStore = cookies();
  //   const authToken = cookieStore.get("auth")?.value;
  const [username, setUsername] = React.useState("");

  getProfileInfo()
    .then((profileInfo: any) => {
      setUsername(", " + profileInfo.username);
    })
    .catch((error) => {
      console.error("Failed to get profile info:", error);
    });

  /* if (!authToken) {
    // Redirect to login page if not authenticated
    redirect("/auth/login");
  } */ // Should not be uncommented

  return (
    <main>
      <h1>Workout Tracker</h1>
      <p>Time for some good workouts{username}.</p>

      <section
        style={{
          justifyContent: "center",
          //   textAlign: "center",
          borderBottom: "100px",
          //   border: "3px solid lightgray",
        }}
      >
        <NewWorkout />
      </section>
    </main>
  );
}

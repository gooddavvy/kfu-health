import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) {
    // Redirect to login page if not authenticated
    // redirect("/auth/login");
  }

  return (
    <main>
      <h1>KFU Health Dashboard</h1>
      <b>Welcome back</b>
    </main>
  );
}

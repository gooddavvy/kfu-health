import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import { getProfileInfo } from "@/utils/profile_api";

export default function GoalHistory(): React.ReactNode {
  let [box, setBox] = useState<React.ReactNode>(
    <Box sx={{ marginTop: "3% !important" }}>
      <CircularProgress style={{ color: "#007bff" }} />
    </Box>
  );
  let [searchQuery, setSearchQuery] = useState<string>("");
  let [filteredGoals, setFilteredGoals] = useState<any[]>([]);

  useEffect(() => {
    setBox(
      <Box sx={{ marginTop: "3% !important" }}>
        <CircularProgress style={{ color: "#007bff" }} />
      </Box>
    );
    let timeoutId = setTimeout(() => {
      getProfileInfo()
        .then((profileInfo: any) => {
          let goalHistory = profileInfo.goal_history;

          let filteredGoals = goalHistory.filter((goal: any) => {
            return (
              goal.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
              goal.startDate
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              goal.deadline.toLowerCase().includes(searchQuery.toLowerCase())
            );
          });

          setFilteredGoals(filteredGoals);
        })
        .catch((error: any) => {
          console.error("Error fetching profile info:", error);
          setFilteredGoals([]);

          setBox(
            <Box sx={{ marginTop: "3% !important" }}>
              <p>Something went wrong. Please try again as soon as possible.</p>
            </Box>
          );
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    setBox(
      <Box sx={{ marginTop: "3% !important" }}>
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  border: "1.5px dashed",
                  borderRadius: "12px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <p>
                  <b>Goal Type:</b> {goal.type}
                </p>
                {goal.achieved ? (
                  <p>
                    <b>✅ Goal Achieved</b>
                  </p>
                ) : (
                  <p>
                    <b>❌ Goal Missed</b>
                  </p>
                )}
                <p>
                  <b>Start Date:</b> {goal.startDate}
                </p>
                <p>
                  <b>Deadline:</b> {goal.deadline}
                </p>
                <p>
                  <b>Initial Value:</b>{" "}
                  {goal.initialWeight ||
                    goal.initialMaxPushups ||
                    goal.initialMaxPullups}
                </p>
                <p>
                  <b>Target Value:</b>{" "}
                  {goal.targetWeight ||
                    goal.targetMaxPushups ||
                    goal.targetMaxPullups}
                </p>
              </div>
            );
          })
        ) : (
          <p>
            No goals match your search. Please search by goal type, start date,
            and deadline.
          </p>
        )}
      </Box>
    );
  }, [filteredGoals]);

  return (
    <Box
      sx={{
        maxWidth: 345,
        textAlign: "center !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        border: "3px solid blue",
        borderRadius: "5px",
        borderWidth: "2px",
        marginTop: "1%",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <h2>Goal History</h2>
          <TextField
            variant="outlined"
            label="🔎 Search Goals"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
          {searchQuery.length > 0 && filteredGoals.length > 0 && (
            <p>
              {filteredGoals.length} results for "{searchQuery}"
            </p>
          )}
          {box}
        </CardContent>
      </Card>
    </Box>
  );
}

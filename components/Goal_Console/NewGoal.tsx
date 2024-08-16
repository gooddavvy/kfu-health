"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { Dropdown } from "@carbon/react";
import type { OnChangeData } from "carbon-components-react";
import { GoalTypes } from "@/utils/goal_types";
import WeightLoss from "./NewGoal/WeightLoss";

const NewGoal: React.FC = ({ sx }: any) => {
  let [goal, setGoal] = useState(null);
  // let [ready, setReady] = useState(false);

  return (
    <Box
      sx={{
        textAlign: "center !important",
        border: "3px solid",
        borderRadius: "5px !important",
        borderWidth: "2px !important",
        marginTop: "1%",
      }}
    >
      <h2>Create a Goal</h2>
      <Box>
        <div>
          <Dropdown
            label="Goal Type"
            titleText="Goal Type"
            id="goal_type"
            selectedItem={goal}
            onChange={({ selectedItem }: OnChangeData<any>) =>
              setGoal(selectedItem)
            }
            items={GoalTypes}
            helperText="Please select the type of goal you will make."
            style={{
              //   width: "20%",
              textAlign: "center",
              justifyContent: "center !important",
              display: "grid !important",
            }}
          />
        </div>

        {goal ===
          "Weight Loss - Target weight to reach by a specific date." && (
          <WeightLoss />
        )}

        <h4 style={{ marginTop: "1%" }}>Discipline equals freedom!</h4>
      </Box>
    </Box>
  );
};

export default NewGoal;
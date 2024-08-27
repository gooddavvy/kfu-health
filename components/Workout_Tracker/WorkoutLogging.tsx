"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { Dropdown, OnChangeData } from "@carbon/react";
import { WorkoutTypes } from "@/utils/workout_types";

const NewWorkout: React.FC<any> = ({ sx }: any) => {
  let [workout, setWorkout] = useState(null);

  return (
    <Box
      sx={{
        textAlign: "center !important",
        border: "3px solid",
        borderRadius: "5px !important",
        borderWidth: "2px !important",
        marginTop: "1%",
        maxWidth: 345,
        minWidth: 435,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center" /* 
        marginLeft: "40%",
        marginRight: "10%", */,
        ...sx,
      }}
    >
      <h2>Plan a Workout Session</h2>
      <Box>
        <div>
          <Dropdown
            label="Workout Type"
            titleText=""
            id="workout_type"
            selectedItem={workout}
            onChange={({ selectedItem }: OnChangeData<any>) =>
              setWorkout(selectedItem)
            }
            items={WorkoutTypes}
            helperText="Please select the type of workout you will do."
            style={{
              //   width: "20%",
              textAlign: "center",
              justifyContent: "center !important",
              display: "grid !important",
            }}
          />
        </div>
        <h4 style={{ marginTop: "1%" }}>Consistency is key!</h4>
      </Box>
    </Box>
  );
};

export default NewWorkout;

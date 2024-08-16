import React, { useState } from "react";
import { Box, Modal, Typography, TextField } from "@mui/material";
import {
  DatePicker,
  DatePickerInput,
  Button as CarbonButton,
} from "@carbon/react";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import { Property } from "csstype";

let addNewGoal = (thisDeadline: string, thisWeight: string) => {
  getProfileInfo()
    .then((profileInfo) => {
      profileInfo.goals.push({
        type: "Weight Loss",
        deadline: thisDeadline,
        targetWeight: thisWeight,
      });

      return updateProfileInfo(profileInfo);
    })
    .then(() => {
      console.log("New goal added successfully.");
    })
    .catch((error) => {
      console.error("Failed to add new goal:", error);
    });
};

let WeightLoss: React.FC = () => {
  let [selectedDate, setSelectedDate] = useState<Date | null>(null);
  let [weight, setWeight] = useState<string>("");
  let [input, setInput] = useState(
    (
      <DatePickerInput
        id="date-picker-input-id"
        labelText="Choose a deadline."
        placeholder="mm/dd/yyyy"
        style={{
          textAlign: "center !important" as Property.TextAlign,
          justifyContent: "center !important",
          display: "grid !important",
        }}
      />
    ) as React.ReactNode
  );
  let [open, setOpen] = useState(true);

  let handleDateChange = (dates: Array<Date | null>) => {
    if (dates && dates[0]) {
      setSelectedDate(dates[0]);
    }
  };
  let handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Set a Goal
          </Typography>
          <DatePicker
            dateFormat="m/d/Y"
            datePickerType="single"
            onChange={handleDateChange}
          >
            {input}
          </DatePicker>
          <TextField
            label="Target weight (lbs)"
            variant="outlined"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{
              marginTop: "20px",
            }}
          />
          <CarbonButton
            disabled={selectedDate === null || weight === ""}
            onClick={() => {
              if (selectedDate && weight !== "") {
                let thisDeadline = selectedDate.toLocaleDateString();
                let thisWeight = weight;
                addNewGoal(thisDeadline, thisWeight);
              }

              setInput(<></>);
              setSelectedDate(null);
              setWeight(""); // Clear the weight input
              handleClose(); // Close the modal after submitting the goal
            }}
            style={{
              marginTop: "20px",
            }}
          >
            Complete
          </CarbonButton>
        </Box>
      </Modal>
    </div>
  );
};

export default WeightLoss;

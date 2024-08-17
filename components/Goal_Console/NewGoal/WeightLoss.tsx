import React, { useState } from "react";
import { Box, Modal, Typography, TextField } from "@mui/material";
import {
  DatePicker,
  DatePickerInput,
  Button as CarbonButton,
} from "@carbon/react";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import { Property } from "csstype";

export let isPastDate = (dateString1: string, dateString2: string): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1 < date2;
};

let addNewGoal = (thisDeadline: string, thisWeight: string, cw: string) => {
  getProfileInfo()
    .then((profileInfo) => {
      profileInfo.goals.push({
        type: "Weight Loss",
        startDate: new Date().toLocaleDateString(),
        deadline: thisDeadline,
        initialWeight: cw,
        targetWeight: thisWeight,
        currentWeight: cw,
        active: !isPastDate(thisDeadline, new Date().toLocaleDateString()),
      });

      updateProfileInfo(profileInfo);
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
  let [cw, setCw] = useState<string>("");
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
            Set a realistic goal you can achieve in steps.
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
          <TextField
            label="Current weight (lbs)"
            variant="outlined"
            fullWidth
            value={cw}
            onChange={(e) => setCw(e.target.value)}
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
                addNewGoal(thisDeadline, thisWeight, cw);
              }

              setInput(<></>);
              setSelectedDate(null);
              setWeight(""); // Clear the weight input
              handleClose(); // Close the modal after submitting the goal

              alert(
                "Weight loss goal has been successfully added. Please refresh the page for up-to-date information."
              );
            }}
            style={{
              marginTop: "20px",
            }}
          >
            Set Goal
          </CarbonButton>
        </Box>
      </Modal>
    </div>
  );
};

export default WeightLoss;

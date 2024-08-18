import React, { useState } from "react";
import { Box, Modal, Typography, TextField } from "@mui/material";
import {
  DatePicker,
  DatePickerInput,
  Button as CarbonButton,
} from "@carbon/react";
import { getProfileInfo, updateProfileInfo } from "../../../utils/profile_api";
import { Property } from "csstype";

export let isPastDate = (dateString1: string, dateString2: string): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1 < date2;
};

let addNewGoal = (thisDeadline: string, thisMax: string, cmp: string) => {
  getProfileInfo()
    .then((profileInfo) => {
      profileInfo.goals.push({
        type: "Pushup Training",
        startDate: new Date().toLocaleDateString(),
        deadline: thisDeadline,
        initialMaxPushups: cmp,
        targetMaxPushups: thisMax,
        currentMaxPushups: cmp,
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

let MaxPushups: React.FC = () => {
  let [selectedDate, setSelectedDate] = useState<Date | null>(null);
  let [max, setMax] = useState<string>("");
  let [cmp, setCmp] = useState<string>("");
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
            label="Target maximum pushup value"
            variant="outlined"
            fullWidth
            value={max}
            onChange={(e) => setMax(e.target.value)}
            sx={{
              marginTop: "20px",
            }}
          />
          <TextField
            label="Current maximum pushup value"
            variant="outlined"
            fullWidth
            value={cmp}
            onChange={(e) => setCmp(e.target.value)}
            sx={{
              marginTop: "20px",
            }}
          />
          <CarbonButton
            disabled={selectedDate === null || max === ""}
            onClick={() => {
              if (selectedDate && max !== "") {
                let thisDeadline = selectedDate.toLocaleDateString();
                let thisWeight = max;
                addNewGoal(thisDeadline, thisWeight, cmp);
              }

              setInput(<></>);
              setSelectedDate(null);
              setMax(""); // Clear the max input
              handleClose(); // Close the modal after submitting the goal

              setTimeout(() => {
                if (typeof window !== "undefined") {
                  window.location.href = window.location.href; // Trigger full reload
                }
              }, 1000);
            }}
            style={{
              marginTop: "20px",
            }}
          >
            Set Goal
          </CarbonButton>
          <Typography
            sx={{ /* color: "gray", */ marginTop: "20px" }}
            component="h4"
          >
            <b>Note:</b> If today is past the deadline you choose, this goal
            will not be added to the Active Goals list.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MaxPushups;

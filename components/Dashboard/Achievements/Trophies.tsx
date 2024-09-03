import React from "react";
import { Box, Typography } from "@mui/material";
import { Accordion, AccordionItem } from "@carbon/react";
import TrophyIcon from "@/components/TrophyIcon";

let TrophyComponent: React.FC<{ trophy: any }> = ({ trophy }) => (
  <Box
    sx={{
      border: "1.5px dashed",
      borderRadius: "12px",
      padding: "10px",
      margin: "10px 0",
      bgcolor: "inherit",
    }}
  >
    <div>
      <TrophyIcon text={trophy.type} />
    </div>
    <h4>Trophy - {trophy.type}</h4>
    <p style={{ marginBottom: "5px" }}>
      Here's the reason this trophy was earned: {trophy.reasonEarned}
    </p>
    <p style={{ marginBottom: "5px" }}>
      This trophy was earned at {trophy.dateAndTimeEarned.time} on{" "}
      {trophy.dateAndTimeEarned.date}.
    </p>
    <p>
      Note:{" "}
      {trophy.unique
        ? "This trophy is unique. This means that this trophy can only be earned once."
        : "This trophy is not unique. This means that this trophy can be earned more than once."}
    </p>
    <Box sx={{ justifyContent: "left !important" }}>
      <Accordion>
        <AccordionItem title="Resource (for Reference)">
          <Typography sx={{ fontSize: "1rem !important" }}>
            Resource Type: {trophy.resource.type}
          </Typography>
          {trophy.resource.type === "Goal" && (
            <Box>
              <p>Goal Type: {trophy.resource.value.type}</p>
            </Box>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  </Box>
);

let Trophies: React.FC<{ profileInfo: any }> = ({ profileInfo }) => {
  let trophyList: any[] = profileInfo.awards.trophies;

  return (
    <Box>
      {trophyList.map((trophy) => (
        <TrophyComponent trophy={trophy} />
      ))}
    </Box>
  );
};

export default Trophies;

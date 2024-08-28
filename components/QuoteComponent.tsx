"use client";

import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const QuoteComponent: React.FC<any> = ({ quote }: { quote: string }) => {
  let [infoHidden, setInfoHidden] = useState<boolean>(true);

  return (
    <Box
      sx={{ display: "inline-block !important", fontWeight: "bold !important" }}
    >
      {quote}
      <IconButton color="primary" onClick={() => setInfoHidden(!infoHidden)}>
        <InfoIcon />
      </IconButton>
      <span style={{ visibility: `${infoHidden ? "hidden" : "visible"}` }}>
        This a motivational quote banner.
      </span>
    </Box>
  );
};

export default QuoteComponent;

import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { GenerateQuote } from "@/utils/quote_manager";

const QuoteComponent: React.FC<any> = ({ sx }: any) => {
  let quote = GenerateQuote();

  return (
    <Box>
      <Typography>{quote}</Typography>
      <IconButton color="primary">
        <InfoIcon />
      </IconButton>
    </Box>
  );
};

export default QuoteComponent;

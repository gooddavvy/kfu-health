import React from "react";
import { Box } from "@mui/material";

interface TrophyIconProps {
  text?: string; // Optional text to display on the base
}

const TrophyIcon: React.FC<TrophyIconProps> = ({ text, ...props }) => {
  return (
    <Box>
      <img src="https://files.oaiusercontent.com/file-kG2PUJrdeCUAcxiypfW8w0yI?se=2024-08-31T21%3A52%3A41Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D2fc6d2c2-b231-4220-aca5-70da3c73bd31.webp&sig=Ii/1tCBGU1eBarnO9n2mG%2BwyaYAOCFprwGlbhxrNz0w%3D" />
    </Box>
  );
}; /* This will be updated later */

export default TrophyIcon;

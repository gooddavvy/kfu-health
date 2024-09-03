import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Collapse,
  IconButton,
  SvgIcon,
} from "@mui/material";

// Importing Collapse icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Interface for error message props
interface ErrorMessageProps {
  error: Error;
}

// SVG Component for the blue X icon
const SvgComponent: React.FC = () => {
  return (
    <SvgIcon
      sx={{ fontSize: 60 }} // Adjust the fontSize to make the icon bigger
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="12" fill="#2196F3" /> {/* Blue circle */}
      <path
        d="M15 9L9 15M9 9l6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

// ErrorMessage Component
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
}: ErrorMessageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {error !== null && (
        <Modal
          open={true} /* The modal cannot be closed */
          onClose={void 0}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            {/* SVG Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <SvgComponent />
            </Box>

            {/* Error message */}
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                Whoops, something went wrong.
              </Typography>
              <Typography variant="body1">
                We ran into an unexpected issue. Please try again as soon as
                possible, and we apologize for any inconvenience.
              </Typography>
            </Box>

            {/* Collapsible for developer message */}
            <Box sx={{ textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">View developer message</Typography>
                <IconButton
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {error.message}
                </Typography>
              </Collapse>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ErrorMessage;

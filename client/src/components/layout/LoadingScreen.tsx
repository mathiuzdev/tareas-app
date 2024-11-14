import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={60} thickness={5} sx={{ mb: 3 }} />
      <Typography variant="h6" color="text.secondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;

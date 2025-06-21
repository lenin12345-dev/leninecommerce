import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 10,height:"100vh" }}>
      {/* Icon */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: "error.light",
          mb: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 50, color: "error.main" }} />
      </Box>

 
      <Typography variant="h3" component="h1" gutterBottom>
        404 — Page Not Found
      </Typography>

   
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </Typography>

 
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          color="primary"
          size="large"
        >
          Go back home
        </Button>
        {/* <Button
          variant="outlined"
          component={RouterLink}
          to="/contact"
          size="large"
        >
          Contact Support
        </Button> */}
      </Stack>
    </Container>
  );
}

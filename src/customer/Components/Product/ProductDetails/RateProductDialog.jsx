import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import api from "../../../.././config/api";

const RateProductDialog = ({ open, onClose, productId ,token,auth}) => {
  const [rating, setRating] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMeassage, setSnakcbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = async () => {
    if (auth.user == null) {
      setOpenSnackBar(true);
      setSeverity("warning");
      setSnakcbarMessage("You must be logged in to rate the product");
      //  return navigate('/login');
      return;
    }
    const payload = {
      productId,
      rating,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await api.post(
        "/api/ratings/create",
        payload,
        config
      );
      // Handle success (e.g., close dialog, reset rating, etc.)
      onClose(); // Close the dialog after submission
      setOpenSnackBar(true);
      setSeverity("success");
      setSnakcbarMessage("Thank you for your rating");
    } catch (error) {
      // Handle error (e.g., display an error message)
    }
  };
  const handleCloseSnakbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <div>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rate This Product</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={rating === 0}
        >
          Submit
        </Button>
      </DialogActions>

    </Dialog>
    <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnakbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
             <Alert
            onClose={handleCloseSnakbar}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {snackbarMeassage}
          </Alert>
        </Snackbar>
    </div>
    
  );
};

export default RateProductDialog;

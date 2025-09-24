import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../Redux/Auth/Action";
import { validEmail } from "../../../util/helper";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function RegisterUserForm({
  setOpenAuthModal,
  setSnackBarMessage,
  setSnackBarSeverity,
  setOpenSnackBar,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const { user, error } = auth;
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setSnackBarMessage("Registration Successful and Logged in");
      setSnackBarSeverity("success");
      setOpenSnackBar(true);
      setLoading(false);
      setOpenAuthModal(false);
    } else if (error) {
      setSnackBarMessage(error);
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      setLoading(false);
    }
  }, [
    user,
    error,
    setOpenSnackBar,
    setSnackBarMessage,
    setSnackBarSeverity,
    setOpenAuthModal,
  ]);

  const validateForm = (userData) => {
    let errorList = {};
    if (!userData.firstName) errorList.firstName = "Please enter first name";
    if (!userData.lastName) errorList.lastName = "Please enter last name";
    if (!userData.email) errorList.email = "Please enter an email";
    if (userData.email && !validEmail(userData.email)) {
      errorList.email = `${userData.email} is not a valid email!`;
    }

    setErrorObj(errorList);
    return Object.keys(errorList).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!validateForm(userData)) return;

    setLoading(true);
    dispatch(register(userData));
  };

  return (
    <div style={{ paddingX: "0.7rem", maxWidth: "600px", margin: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
          marginBottom: 3,
        }}
      >
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              error={!!errorObj.firstName}
              helperText={errorObj.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              error={!!errorObj.lastName}
              helperText={errorObj.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              error={!!errorObj.email}
              helperText={errorObj.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className=" w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{
                padding: ".8rem 0",
                backgroundColor: "#f5a623",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  backgroundColor: "black",
                  transform: "scale(1.01)",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center mt-3">
        <div className="py-3 flex items-center justify-center">
          <p className="m-0 p-0">Already have an account?</p>
          <Button
            onClick={() => navigate("/login")}
            size="medium"
            style={{
              color: "#f5a623",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

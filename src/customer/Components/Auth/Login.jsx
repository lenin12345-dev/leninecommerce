import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginUserForm({
  setSnackBarMessage,
  setSnackBarSeverity,
  setOpenSnackBar,
  setOpenAuthModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { user, error } = auth;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setSnackBarMessage("Login Successful");
      setSnackBarSeverity("success");
      setOpenSnackBar(true);
      setLoading(false);
      setOpenAuthModal(false);
    } else if (error && error.source !== "getUser") {
      setSnackBarMessage(error || "Login Failed");
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      setLoading(false);
    }
  }, [
    user,
    error,
    setSnackBarMessage,
    setSnackBarSeverity,
    setOpenSnackBar,
    setOpenAuthModal,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
    navigate("/")
  };

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
          marginBottom: 3,
        }}
      >
        Sign In
      </Typography>
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              size="small"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              size="small"
              fullWidth
              autoComplete="current-password"
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
              className="w-full"
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                padding: ".3rem 0",
                backgroundColor: "#f5a623",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "black",
                  transform: "scale(1.01)",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center justify-center">
          <p className="m-0 p-0">Don't have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            style={{
              color: "#f5a623",
              fontWeight: "bold",
              textTransform: "none",
            }}
            size="medium"
          >
            Register
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

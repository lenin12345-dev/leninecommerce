import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect } from "react";
import { useState } from "react";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const jwt=localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);
  const { isLoading } = auth;

  // useEffect(()=>{
  //   if(jwt){
  //     console.log('mmm')
  //     dispatch(getUser(jwt))
  //   }

  // },[jwt])

  // useEffect(() => {
  //   if (auth.user || auth.error) setOpenSnackBar(true)
  // }, [auth.user,auth.error]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
  };

  return (
    <React.Fragment className=" shadow-lg ">
      <Typography
        variant="h4"
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
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="w-full"
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
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center justify-center">
          <p className="m-0 p-0">Don't have account ?</p>
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

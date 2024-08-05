import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../../Redux/Auth/Action';
import { validEmail } from '../../../util/helper';


export default function RegisterUserForm({ handleNext,setOpenAuthModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
const [snackBarSeverity, setSnackBarSeverity] = useState('success');
  const { auth } = useSelector((store) => store);
  const handleClose = () => setOpenSnackBar(false);
  const [errorObj, setErrorObj] = useState({});
  const jwt = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);
   console.log('auth',auth)
   useEffect(() => {

      if (auth.user) {
        setSnackBarMessage('Registration Successful and Logging in');
        setSnackBarSeverity('success');
      } else if (auth.error) {
        setSnackBarMessage(auth.error);
        setSnackBarSeverity('error');
      }
    
  }, [auth]);

  const validateForm = (userData) => {
    let errorList = {};

    if (!userData.firstName) {
      errorList.firstName = 'Please enter first name';
    }
    if (!userData.lastName) {
      errorList.lastName = 'Please enter last name';
    }
    if (!userData.email) {
      errorList.email = 'Please enter an email';
    }
    if (userData.email && !validEmail(userData.email)) {
      errorList.email = `${userData.email} is not a valid email!`;
    }
    if (Object.keys(errorList).length === 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!validateForm(userData)) return;

    dispatch(register(userData));
    setOpenSnackBar(true);
    setSnackBarMessage('Registering...');
    setSnackBarSeverity('info');
    if (auth.user){
      setSnackBarMessage('Registration Successful and Logging in');
      setSnackBarSeverity('success');
      setLoading(false)
    setOpenAuthModal(false);

    }
  };

  return (
    <div>
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
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: '.8rem 0' }}
              disabled={loading}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p className="m-0 p-0">Already have an account?</p>
          <Button
            onClick={() => navigate('/login')}
            className="ml-5"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

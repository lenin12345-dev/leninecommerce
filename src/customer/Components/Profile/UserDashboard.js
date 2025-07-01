import { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/Auth/Action";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box mt={2}>{children}</Box>}
    </div>
  );
}

export default function UserDashboard() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { auth } = useSelector((store) => store);
  const user = auth.user;
    const { userId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    role: ''
  });

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setProfile({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        mobile: user.mobile || '',
        role: user.role || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        User Dashboard
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable">
        <Tab label="Profile" />
        <Tab label="Addresses" />
      </Tabs>

      {/* Profile Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="First Name"
            name="firstname"
            value={profile.firstname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={profile.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={profile.role}
            disabled
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </TabPanel>

      {/* Addresses Tab */}
      <TabPanel value={tabIndex} index={1}>
        <Grid container spacing={2}>
          {(user?.addresses || []).map((address) => (
            <Grid item xs={12} md={6} key={address._id}>
              <Card>
                <CardContent>
                  <Typography>{JSON.stringify(address)}</Typography>
                  {/* You can format address if it has fields like street, city, etc. */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
}

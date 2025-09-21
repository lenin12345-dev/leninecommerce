import { useEffect, useState } from "react";

import {
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormLabel from "@mui/material/FormLabel";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, order } = useSelector((store) => store);
  const { loading } = order;
  const [selectedAddress, setSelectedAdress] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    localStorage.setItem(
      "savedAddress",
      JSON.stringify({ address, expiry: expiry.getTime() })
    );
    dispatch(createOrder({ address, jwt, navigate }));
    handleNext();
  };
  useEffect(() => {
    const saved = localStorage.getItem("savedAddress");
    if (saved) {
      const { address, expiry } = JSON.parse(saved);
      if (new Date().getTime() < expiry) {
        setSelectedAdress(address);
      } else {
        localStorage.removeItem("savedAddress"); // expired
      }
    }
  }, []);

  const addresses = auth.user?.addresses || [];

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, jwt, navigate }));
    handleNext();
  };


  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll">
          {addresses.length > 0 ? (
            addresses.map((item) => (
              <div
                onClick={() => setSelectedAddress(item)}
                className="p-5 py-7 border-b cursor-pointer"
                key={item.id}
              >
                <AddressCard address={item} />
                {selectedAddress?.id === item.id && (
                  <Button
                    sx={{ mt: 2 }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreateOrder(item)}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Deliver Here"}
                  </Button>
                )}
              </div>
            ))
          ) : (
            <Box className="flex items-center justify-center h-full">
              <Typography style={{ fontSize: 25 }} fontWeight="bold">
                No saved address.
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="first-name" required>
                  First name
                </FormLabel>
                <OutlinedInput
                  required
                  id="firstName"
                  name="firstName"
                  type="name"
                  fullWidth
                  autoComplete="given-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="first-name" required>
                  Last Name
                </FormLabel>
                <OutlinedInput
                  required
                  id="lastName"
                  name="lastName"
                  fullWidth
                  autoComplete="given-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="address" required>
                  Address line 1
                </FormLabel>
                <OutlinedInput
                  required
                  id="address"
                  name="address"
                  fullWidth
                  autoComplete="shipping address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="adress">Address line 2</FormLabel>
                <OutlinedInput
                  id="addressl"
                  name="address"
                  fullWidth
                  autoComplete="shipping address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="adress" required>
                  City
                </FormLabel>
                <OutlinedInput
                  required
                  id="city"
                  name="city"
                  fullWidth
                  autoComplete="shipping address-level2"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="adress" required>
                  State
                </FormLabel>
                <OutlinedInput
                  required
                  id="state"
                  name="state"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="adress" required>
                  State
                </FormLabel>
                <OutlinedInput
                  required
                  id="zip"
                  name="zip"
                  fullWidth
                  autoComplete="shipping postal-code"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="adress" required>
                  Phone Number
                </FormLabel>
                <OutlinedInput
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  fullWidth
                  autoComplete="tel"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    padding: ".9rem 1.5rem",
                    backgroundColor: "#f5a623",
                    ":hover": {
                      backgroundColor: "black",
                    },
                  }}
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Deliver Here"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

import * as React from "react";
import { Grid, TextField, Button, Box,CircularProgress,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { useState } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth,order } = useSelector((store) => store);
  const {loading} = order
  const [selectedAddress, setSelectedAdress] = useState(null);

  // console.log("auth", auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    dispatch(createOrder({ address, jwt, navigate }));
    // after perfoming all the opration
    handleNext();
  };
  const addresses = auth.user?.addresses || [];

  const handleCreateOrder = (item) => {

    dispatch(createOrder({ address:item, jwt, navigate }));
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
        <Box
        className="flex items-center justify-center h-full"
      >
             <Typography style={{ fontSize:25 }} fontWeight="bold">
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
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
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

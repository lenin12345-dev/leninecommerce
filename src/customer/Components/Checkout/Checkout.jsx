import React, { useEffect, lazy, Suspense,startTransition } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton"; 

const AddDeliveryAddressForm = lazy(() => import("./AddAddress"));
const OrderSummary = lazy(() => import("./OrderSummary"));

const steps = ["Login", "Delivery Adress", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const step = Number(queryParams.get("step")) || 1;

  const { auth } = useSelector((store) => store);

  const handleBack = () => {
    if (step > 1) navigate(`/checkout?step=${step - 1}`);
  };

  const handleNext = () => {
      if (step < steps.length) {
    startTransition(() => {
      navigate(`/checkout?step=${step + 1}`);
    });
  }
  };

 console.log(auth);
 

  useEffect(() => {
    if (!auth.isLoading && !auth.user ) {
      navigate("/login");
    }
  }, [auth.user,auth.isLoading]);
      if (auth.isLoading) {
    return (
      <Box className="px-5 py-4 lg:px-32" sx={{ width: "100%",height:"100vh" }}>
        <Skeleton variant="rectangular" height={40} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" />
      </Box>
    );
  }

  


  return (
    <Box className="px-5 py-4 lg:px-32 " sx={{ minHeight: { xs: "auto", md: "100vh" }, width: "100%" }}>
      <Stepper activeStep={step - 1}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step > steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step == 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          {/* <Typography sx={{ my: 6 }}>Title</Typography> */}

          <div className="my-5">
            <Suspense fallback={<div>Loading...</div>}>
              {step === 2 ? (
                <AddDeliveryAddressForm handleNext={handleNext} />
              ) : (
                <OrderSummary />
              )}
            </Suspense>
          </div>

          {/* <AddDeliveryAddressForm handleNext={handleNext} /> */}
        </React.Fragment>
      )}
    </Box>
  );
}

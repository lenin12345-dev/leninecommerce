import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId]);

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 lg:px-36 pt-8 pb-12 bg-gray-50">
      <div>
        <div className="flex flex-col items-center">
          <Alert
            variant="filled"
            severity="success"
            sx={{ mb: 6,mt:2, width: "fit-content" }}
          >
            <AlertTitle>Payment Successful</AlertTitle>
            Congratulations! Your order has been placed.
          </Alert>
        </div>

        <OrderTraker activeStep={1} />

        <div className="mt-10">
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Grid container spacing={4}>
            {order.order?.orderItems.map((item) => (
              <Grid
                container
                item
                xs={12}
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md border"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Grid item xs={12} md={6}>
                  <div className="flex items-center">
                    <img
                      className="w-[5rem] h-[5rem] rounded-md object-cover"
                      src={item?.product.imageUrl}
                      alt={item?.product.title}
                    />
                    <div className="ml-5 space-y-1">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-xs"
                      >
                        Color: Pink &nbsp;|&nbsp; Size: {item.size}
                      </Typography>
                      <Typography variant="body2">
                        Seller: {item.product.brand}
                      </Typography>
                      <Typography fontWeight={600}>₹{item.price}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={5}>
                  <AddressCard address={order.order?.shippingAddress} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>


    </div>
  );
};

export default PaymentSuccess;

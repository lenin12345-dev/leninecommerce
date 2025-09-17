import React, { useEffect } from "react";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Cart/CartItem";
import AddressCard from "../adreess/AdreessCard";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { createPayment } from "../../../Redux/Customers/Payment/Action";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const order = useSelector((state) => state.order);
  const payment = useSelector((state) => state.payment);
  const { loading, order: orderData } = order;
  const { loading: paymentLoading } = payment;


  useEffect(() => {
    if (orderId && jwt && !orderData) {
      dispatch(getOrderById(orderId, jwt));
    }
  }, [orderId, jwt, orderData, dispatch]);

  const handleCreatePayment = () => {
    if (!orderData) return;
    dispatch(createPayment({ orderId: orderData._id, jwt }));
  };

  if (loading || !orderData) {
    return (
      <div className="space-y-5">
        <Skeleton variant="rectangular" width="100%"  />
        {Array.from(new Array(3)).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={118} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5" style={{ minHeight: "100vh" }}>
      {/* Shipping Address */}
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={orderData?.shippingAddress} />
      </div>

      {/* Order Items and Price Details */}
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 space-y-3">
          {orderData?.orderItems?.map((item) => (
            <CartItem key={item._id} item={item} showButton={false} />
          ))}
        </div>

        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({orderData.totalItem} item)</span>
                <span>${orderData.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-${orderData.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">${orderData.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              sx={{
                padding: ".8rem 2rem",
                marginTop: "2rem",
                width: "100%",
                backgroundColor: "#f5a623",
                ":hover": { backgroundColor: "black" },
              }}
              disabled={paymentLoading}
            >
              {paymentLoading ? <CircularProgress size={24} /> : "Make Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

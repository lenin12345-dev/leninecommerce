import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import NoDataCard from "../NoDataCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, auth } = useSelector((store) => store);

  
// Instant Access: localStorage is a synchronous API. 
// When you access localStorage.getItem("jwt"), it retrieves the data immediately without any delays.
//auth.user from Redux: Usually requires rehydrating the Redux store, possibly involving an API call to get user information from the server, which adds asynchronous delay.


  console.log("cart", cart);


  return (
    <Box
      className="min-h-[calc(100vh)] flex flex-col pt-5"
    >
      {cart.cartItems.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative flex-grow">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className="space-y-3">
              {cart.cartItems.map((item) => (
                <CartItem key={item._id} item={item} showButton={true} />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price ({cart.cart?.totalItem} item)</span>
                  <span>${cart.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">
                    -${cart.cart?.discounte}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    ${cart.cart?.totalDiscountedPrice}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                type="submit"
                sx={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                  backgroundColor: "#f5a623",
                  ":hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Box className="flex-grow flex items-center justify-center">
          <NoDataCard
            noDataFoundText="No Product Found"
            styleCardProps={{  height: "600px",width:"600px",display:"flex",alignItems:"center",justifyContent:"center"} }
          />
        </Box>
      )}
    </Box>
  );
};

export default Cart;

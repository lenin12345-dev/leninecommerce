import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import NoDataCard from "../../Components/NoDataCard";

// Fix: typo `vlue` -> `value`
const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) dispatch(getOrderHistory({ jwt }));
  }, [jwt, dispatch]);

  const allItems = order.orders?.flatMap((order) => order.orderItems) || [];

  return (
    <Box className="p-10 md:p-20">
      <Grid container spacing={4}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <div className="shadow-md bg-white border p-6 rounded-md sticky top-5">
            <h1 className="font-bold text-xl mb-6">Filters</h1>
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-700 text-sm">ORDER STATUS</h2>
              {orderStatus.map((option, idx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled // Placeholder - not yet wired
                  />
                  <label className="ml-3 text-sm text-gray-600">{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box className="space-y-5">
            {/* Header */}
        

            {/* Order Items */}
            {allItems.length > 0 &&
              order.orders.map((order, orderIdx) =>
                order.orderItems.map((item, itemIdx) => (
                  <OrderCard
                    key={`${order._id}-${item._id}-${itemIdx}`}
                    item={item}
                    order={order}
                  />
                ))
              )}

            {/* No Orders */}
            {!order.loading && order.orders?.length === 0 && (
              <NoDataCard
                noDataFoundText="No Order Found"
                styleCardProps={{ style: { height: 500 } }}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Loading Backdrop */}
      <BackdropComponent open={order.loading} />
    </Box>
  );
};

export default Order;

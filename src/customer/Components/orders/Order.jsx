import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Drawer,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import OrderCard from "./OrderCard";
import BackdropComponent from "../BackDrop/Backdrop";
import NoDataCard from "../../Components/NoDataCard";

const orderStatusOptions = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    if (jwt) dispatch(getOrderHistory({ jwt }));
  }, [jwt, dispatch]);

  // Handle filter toggle
  const handleFilterChange = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Filter orders based on active filters
  const filteredOrders = order.orders?.filter((o) =>
    activeFilters.length > 0
      ? activeFilters.includes(o.status)
      : true
  );
  console.log("order order", order);

  return (
    <Box className="p-4 md:p-10">
      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box className="p-4 w-64">
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Order Status
          </Typography>
          {orderStatusOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={activeFilters.includes(option.value)}
                  onChange={() => handleFilterChange(option.value)}
                />
              }
              label={option.label}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setMobileFiltersOpen(false)}
          >
            Apply
          </Button>
        </Box>
      </Drawer>

      {/* Mobile Filter Button */}
      <Box className="flex md:hidden mb-4">
        <IconButton onClick={() => setMobileFiltersOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1" ml={1} mt={0.5}>
          Filters
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Sidebar Filters - visible on md+ */}
        <Grid item xs={12} md={3} className="hidden md:block">
          <Box className="shadow-md bg-white border p-6 rounded-md sticky top-5">
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Order Status
            </Typography>
            {orderStatusOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={activeFilters.includes(option.value)}
                    onChange={() => handleFilterChange(option.value)}
                  />
                }
                label={option.label}
              />
            ))}
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box className="space-y-5">
            {filteredOrders?.length > 0 ? (
              filteredOrders.map((orderItem) =>
                orderItem.orderItems.map((item) => (
                  <OrderCard
                    key={`${orderItem._id}-${item._id}`}
                    item={item}
                    order={orderItem}
                  />
                ))
              )
            ) : (
              !order.loading && (
                <NoDataCard
                  noDataFoundText="No Orders Found"
                  styleCardProps={{ style: { height: 500 } }}
                />
              )
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

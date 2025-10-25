import React, { useEffect, useState, useCallback } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", sort: "" });

  // 🧠 Fetch Orders
  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [
    dispatch,
    jwt,
    adminsOrder.delivered,
    adminsOrder.shipped,
    adminsOrder.confirmed,
  ]);

  // 🧠 Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaginationChange = (_, value) => {
    setCurrentPage(value);
    dispatch(getOrders({ jwt, page: value }));
  };

  const handleMenuClick = (event, index) => {
    setAnchorElArray((prev) => {
      const newArr = [...prev];
      newArr[index] = event.currentTarget;
      return newArr;
    });
  };

  const handleMenuClose = (index) => {
    setAnchorElArray((prev) => {
      const newArr = [...prev];
      newArr[index] = null;
      return newArr;
    });
  };

  const handleOrderAction = useCallback(
    (action, orderId, index) => {
      handleMenuClose(index);
      const actionMap = {
        confirm: confirmOrder,
        ship: shipOrder,
        deliver: deliveredOrder,
        delete: deleteOrder,
      };
      dispatch(actionMap[action](orderId));
    },
    [dispatch]
  );

  // 🧩 Reusable Chip color logic
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "success";
      case "SHIPPED":
        return "secondary";
      case "PLACED":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* 🔹 Filters */}
      <Card className="p-3">
        <CardHeader title="Sort" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleChange}
              >
                {["PLACED", "CONFIRMED", "DELIVERED", "CANCELLED"].map(
                  (status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                name="sort"
                value={filters.sort}
                label="Sort By"
                onChange={handleChange}
              >
                {["Newest", "Older"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* 🔹 Orders Table */}
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {adminsOrder?.orders?.length ? (
                adminsOrder.orders.map((order, index) => (
                  <TableRow key={order._id} hover>
                    <TableCell>
                      <AvatarGroup max={4}>
                        {order.orderItems.map((oi) => (
                          <Avatar
                            key={oi._id}
                            alt={oi.product?.title}
                            src={oi.product?.imageUrl}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={500}>
                        {order.orderItems
                          .map((oi) => oi.product?.title)
                          .join(", ")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.orderItems
                          .map((oi) => oi.product?.brand)
                          .join(", ")}
                      </Typography>
                    </TableCell>

                    <TableCell>${order.totalPrice}</TableCell>

                    <TableCell align="center">
                      <Chip
                        label={order.orderStatus}
                        color={getStatusColor(order.orderStatus)}
                        sx={{ color: "white", fontWeight: "bold" }}
                      />
                    </TableCell>

                    {/* Update */}
                    <TableCell align="center">
                      <Button
                        onClick={(e) => handleMenuClick(e, index)}
                        aria-controls={`menu-${order._id}`}
                      >
                        Status
                      </Button>
                      <Menu
                        id={`menu-${order._id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleMenuClose(index)}
                      >
                        <MenuItem
                          disabled={[
                            "DELIVERED",
                            "SHIPPED",
                            "CONFIRMED",
                          ].includes(order.orderStatus)}
                          onClick={() =>
                            handleOrderAction("confirm", order._id, index)
                          }
                        >
                          CONFIRM ORDER
                        </MenuItem>
                        <MenuItem
                          disabled={["DELIVERED", "SHIPPED"].includes(
                            order.orderStatus
                          )}
                          onClick={() =>
                            handleOrderAction("ship", order._id, index)
                          }
                        >
                          SHIP ORDER
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleOrderAction("deliver", order._id, index)
                          }
                        >
                          DELIVER ORDER
                        </MenuItem>
                      </Menu>
                    </TableCell>

                    {/* Delete */}
                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => handleOrderAction("delete", order._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ height: 200 }}>
                    <Typography color="text.secondary" fontWeight={500}>
                      No orders found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* 🔹 Pagination */}
      {!!adminsOrder?.orders?.length && (
        <Card className="mt-2 flex justify-center items-center">
          <Pagination
            className="py-5"
            size="large"
            count={adminsOrder?.totalPages}
            page={currentPage}
            color="primary"
            onChange={handlePaginationChange}
          />
        </Card>
      )}
    </Box>
  );
};

export default OrdersTable;

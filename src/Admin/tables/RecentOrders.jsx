import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton
} from "@mui/material";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Admin/Orders/Action";

const RecentOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((store) => store.adminsOrder);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt]);

  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/orders")}
            variant="caption"
            sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}
          >
            View All
          </Typography>
        }
        titleTypographyProps={{
          variant: "h5",
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>

              <TableCell>Price</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(5)).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                  </TableRow>
                ))
              : orders.slice(0, 5).map((item) => (
                  <TableRow hover key={item._id}>
                    <TableCell>
                      <Avatar
                        src={item?.orderItems[0]?.product.imageUrl}
                        alt={item?.orderItems[0]?.product.title}
                      />
                    </TableCell>
                    <TableCell>{item?.orderItems[0]?.product.title}</TableCell>
                    <TableCell>
                      {item?.orderItems[0]?.product.discountedPrice}
                    </TableCell>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.orderStatus}
                        color="success"
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;

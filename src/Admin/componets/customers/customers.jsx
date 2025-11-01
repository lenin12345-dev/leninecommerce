import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Avatar, CardHeader, Pagination } from "@mui/material";
import api from "../../../config/api";

const Customers = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCurrentUsers = async () => {
    try {
      const { data } = await api.get(`/api/users/recent?page=${page}&limit=10`);
      setNewUsers(data?.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUsers();
  }, [page]);
  const handlePaginationChange = (_, value) => {
    setPage(value);
  };
  return (
    <Box>
      <Card>
        <CardHeader
          title="All Customers"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminsOrder.loading ? (
                // 🔹 Show skeletons while loading
                Array.from(new Array(10)).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredOrders?.length > 0 ? (
                // 🔹 Render orders when data available
                filteredOrders.slice(0, 10).map((order, index) => (
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
                // 🔹 Show message only when not loading and empty
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
      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={totalPages}
          page={page}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default Customers;

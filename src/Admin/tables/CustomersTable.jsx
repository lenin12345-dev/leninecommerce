import { Avatar, Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

const CustomersTable = () => {
  const navigate = useNavigate();
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUsers = async () => {
    try {
      const { data } = await api.get("/api/users/recent");
      setNewUsers(data?.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUsers();
  }, []);

  return (
    <Card>
      <CardHeader
        title="New Customers"
        sx={{ pt: 2, alignItems: "center", "& .MuiCardHeader-action": { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/customers")} variant="caption" sx={{ color: "blue", cursor: "pointer", pr: 1 }}>View All</Typography>}
        titleTypographyProps={{ variant: "h5", sx: { lineHeight: "1.6 !important", letterSpacing: "0.15px !important" } }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 390 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? Array.from(new Array(5)).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                <TableCell><Skeleton width="80%" /></TableCell>
                <TableCell><Skeleton width="60%" /></TableCell>
              </TableRow>
            )) : (
              newUsers.slice(0, 5).map(item => (
                <TableRow hover key={item._id}>
                  <TableCell><Avatar src={item.image} alt={item.firstname} /></TableCell>
                  <TableCell>{item.firstname} {' '} {item.lastname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomersTable;

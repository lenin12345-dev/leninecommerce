// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { Avatar, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../config/api";

const CustomersTable = () => {
  const navigate = useNavigate();
  const [newUsers, setNewUsers] = useState([]);

  const fetchCurrentUsers = async () => {
    try {
      const { data } = await api.get("/api/users/recent");

      if (data && data.length > 0) {
        setNewUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentUsers();
  }, []);
  return (
    <Card>
      <CardHeader
        title="New Customers"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/customers")}
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
        <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newUsers?.slice(0, 5).map((item) => (
              <TableRow
                hover
                key={item?.firstName}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell>
                  {" "}
                  <Avatar alt={item?.firstName} src={item.image} />{" "}
                </TableCell>
                <TableCell>
                  {item?.firstname} {item?.lastname}
                </TableCell>
                <TableCell>{item?.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomersTable;

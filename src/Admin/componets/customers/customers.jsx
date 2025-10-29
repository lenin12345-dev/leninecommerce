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
              {loading
                ? Array.from(new Array(10)).map((_, i) => (
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
                    </TableRow>
                  ))
                : newUsers.slice(0, 10).map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>
                        <Avatar src={item.image} alt={item.firstname} />
                      </TableCell>
                      <TableCell>
                        {item.firstname} {item.lastname}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                    </TableRow>
                  ))}
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

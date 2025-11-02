import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
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
  Skeleton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { products, loading } = customersProduct;
// Avoids recreating the search params object on every render
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [filterValue, setFilterValue] = useState({
    availability: searchParams.get("availability") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || "",
  });

  const page = Number(searchParams.get("page")) || 1;

  const handlePaginationChange = (_, value) => {
    searchParams.set("page", value);
    // Because you navigated, React Router re-renders your component with a new location object.
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleFilterChange = (e, key) => {
    const value = e.target.value;

    setFilterValue((prev) => ({ ...prev, [key]: value }));

    // If "All" or empty, remove param for cleaner URL
    if (value === "" || value === "All") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    // Always reset to page 1 on filter change
    searchParams.delete("page");

    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  const handleResetFilters = () => {
    setFilterValue({ availability: "", category: "", sort: "" });
    navigate(""); // clear all query params
  };

  useEffect(() => {
    const data = {
      category: filterValue.category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: filterValue.sort || "price_low",
      pageNumber: page,
      pageSize: 10,
      stock: filterValue.availability || "",
    };
    dispatch(findProducts(data));
  }, [filterValue, page, dispatch]);

  const handleDeleteProduct = (id) => dispatch(deleteProduct(id));

  return (
    <Box width="100%">
      <Card className="p-3">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="T-Shirts">T-Shirts</MenuItem>
                <MenuItem value="Pants">Pants</MenuItem>
                <MenuItem value="Jackets">Jackets</MenuItem>
                <MenuItem value="Sneakers">Sneakers</MenuItem>
                <MenuItem value="Heels">Heels</MenuItem>
                <MenuItem value="Boots">Boots</MenuItem>
                <MenuItem value="Formal Shoes">Formal Shoes</MenuItem>
                <MenuItem value="Watches">Watches</MenuItem>
                <MenuItem value="Tops">Tops</MenuItem>
                <MenuItem value="Dresses">Dresses</MenuItem>
                <MenuItem value="Handbags">Handbags</MenuItem>
                <MenuItem value="Saree">Saree</MenuItem>
                <MenuItem value="Smartphones">Smartphones</MenuItem>
                <MenuItem value="Laptops">Laptops</MenuItem>
                <MenuItem value="Tablets">Tablets</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="in_stock">In Stock</MenuItem>
                <MenuItem value="out_of_stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By Price</InputLabel>
              <Select
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value="price_low">Low → High</MenuItem>
                <MenuItem value="price_high">High → Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ height: "100%" }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer sx={{ maxHeight: 600, minHeight: 600, overflowY: "auto" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton width="80%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : products?.content?.length > 0 ? (
                products.content.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Avatar src={item.imageUrl} alt={item.title} />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="center">{item.category?.name}</TableCell>
                    <TableCell align="center">${item.discountedPrice}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      No products found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 border">
        <Box display="flex" justifyContent="center" py={3}>
          <Pagination
            count={products?.totalPages}
            color="primary"
            page={page}
            onChange={handlePaginationChange}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ProductsTable;

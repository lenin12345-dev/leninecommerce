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
  Skeleton
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customersProduct } = useSelector((store) => store);
  const { products, loading } = customersProduct;

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [localTotalPages, setLocalTotalPages] = useState(1);

  // Sync currentPage when URL changes
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    if (products?.totalPages) {
      setLocalTotalPages(products.totalPages);
    }
  }, [products?.totalPages]);

  // Filter state
  const [filterValue, setFilterValue] = useState({
    availability: searchParams.get("availability") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || ""
  });

  // Handle pagination
  const handlePaginationChange = (_, value) => {
    setCurrentPage(value);

    const newParams = new URLSearchParams(location.search);
    newParams.set("page", value);

    navigate({
      search: `?${newParams.toString()}`
    });
  };

  // Handle filters
  const handleFilterChange = (e, key) => {
    const value = e.target.value;

    setFilterValue((prev) => ({ ...prev, [key]: value }));

    const newParams = new URLSearchParams(location.search);

    if (value === "" || value === "All") newParams.delete(key);
    else newParams.set(key, value);

    // Reset page on filter change
    newParams.delete("page");

    navigate({
      search: newParams.toString() ? `?${newParams.toString()}` : ""
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilterValue({ availability: "", category: "", sort: "" });
    navigate("");
  };

  // Fetch products
  useEffect(() => {
    const data = {
      category: filterValue.category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: filterValue.sort || "price_low",
      pageNumber: currentPage,
      pageSize: 10,
      stock: filterValue.availability || ""
    };

    dispatch(findProducts(data));
  }, [filterValue, currentPage, dispatch]);

  const handleDeleteProduct = (id) => dispatch(deleteProduct(id));

  return (
    <Box width="100%">
      {/* FILTERS */}
      <Card className="p-3">
        <Grid container spacing={2} alignItems="center">
          
          {/* Category */}
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

          {/* Availability */}
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

          {/* Sort */}
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

          {/* Reset */}
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

      {/* TABLE */}
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
                      <Button color="error" onClick={() => handleDeleteProduct(item._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">No products found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>

      {/* PAGINATION */}
      <Card className="mt-2 border">
        <Box display="flex" justifyContent="center" py={3}>
          <Pagination
            count={localTotalPages}
            color="primary"
            page={currentPage}
            onChange={handlePaginationChange}
          />
        </Box>
      </Card>

    </Box>
  );
};

export default ProductsTable;

import { useState, useEffect, Fragment } from "react";
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import api from "../../../config/api";
import "./CreateProductForm.css";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    sizes: initialSizes,
    quantity: "",
    description: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Helper functions
  const updateField = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSizeField = (index, field, value) => {
    const newSizes = [...productData.sizes];
    newSizes[index][field] = value;
    setProductData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const handleChange = (e) => updateField(e.target.name, e.target.value);

  const handleSizeChange = (e, index) => {
    const field = e.target.name === "size_quantity" ? "quantity" : e.target.name;
    updateSizeField(index, field, e.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const categoriesMap = {};
  categories.forEach((cat) => {
    categoriesMap[cat._id] = cat;
  });

  const getFullCategoryName = (cat) => {
    if (!cat.parentCategory) return cat.name;
    return getFullCategoryName(categoriesMap[cat.parentCategory]) + " > " + cat.name;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(createProduct({ data: productData, jwt }));
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-4">
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit} className="createProductContainer min-h-screen">
        <Grid container spacing={2}>
          {/* Image URL */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          {/* Brand and Title */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Brand" name="brand" value={productData.brand} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Title" name="title" value={productData.title} onChange={handleChange} />
          </Grid>

          {/* Color and Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Color" name="color" value={productData.color} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Price Fields */}
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Price" name="price" value={productData.price} onChange={handleChange} type="number" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Sizes */}
          {productData.sizes.map((size, index) => (
            <Grid key={index} container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(e) => handleSizeChange(e, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(e, index)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {getFullCategoryName(cat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              sx={{ p: 1.8 }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Add New Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;

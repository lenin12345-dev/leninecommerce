import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Snackbar,
  Alert,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import {
  getAllReviews,
  createReview,
} from "../../../../Redux/Customers/Review/Action";
import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import RateProductDialog from "./RateProductDialog";
import BackdropComponent from "../../BackDrop/Backdrop";
import ProductPageSkeleton from "../../skeleton/ProductPageSkeleton";
import api from "../../../../config/api";
import NoDataCard from "../../NoDataCard";


const product = {
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, auth } = useSelector((store) => store);
  const { loading } = customersProduct;
  const { productId } = useParams();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [snackbarMeassage, setSnakcbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [reviews, setReviews] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const fetchSuggestedProducts = async () => {
    try {
      const response = await api.get(`api/suggest-products/${productId}`);
      if (response?.length > 0) {
        setSuggestedProducts(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    category: {
      name: thirdLevelName,
      parentCategory: {
        name: secondLevelName,
        parentCategory: { name: topLevelName } = {},
      } = {},
    } = {},
  } = customersProduct.product || {};

  const breadCrumbs = [];

  if (topLevelName || secondLevelName || thirdLevelName) {
    if (topLevelName) breadCrumbs.push({ id: 1, name: topLevelName, url: "/" });
    if (secondLevelName)
      breadCrumbs.push({ id: 2, name: secondLevelName, url: "/" });
    if (thirdLevelName)
      breadCrumbs.push({ id: 3, name: thirdLevelName, url: "/" });
  }

  const details = (secondLevelName) => {
    switch (secondLevelName) {
      case "Clothing":
        return `Our clothing collection offers a perfect blend of style, comfort, and durability. Crafted from premium-quality fabrics, each piece is designed to ensure lasting comfort, whether you’re dressing up for a formal occasion or opting for a casual day out. Available in a variety of sizes and colors, our range caters to every taste and preference. With modern designs and easy-care materials, these garments offer both versatility and convenience, making them an essential addition to your wardrobe.`;

      case "Accessories":
        return `Complete your look with our sophisticated selection of accessories, designed to add that perfect finishing touch. Each item in our collection, from sleek watches to elegant jewelry and functional bags, is made from high-quality materials, ensuring long-lasting style and durability. Our versatile designs complement any outfit, making them suitable for daily wear or special occasions. Whether you're treating yourself or buying a gift, these lightweight and stylish accessories will never go out of style.`;

      case "Footwear":
        return `Step into comfort and style with our premium footwear range, featuring designs that cater to both casual and formal needs. Each pair is crafted with an ergonomic design to provide ultimate comfort throughout the day. With durable materials and non-slip soles, our shoes offer both safety and longevity, ensuring they’ll be your go-to choice for years to come. Available in a wide range of sizes and styles, our footwear ensures that you’ll find the perfect fit for any occasion.`;

      case "Laptops":
        return `Our laptops strike the perfect balance between power and portability, offering the performance you need in a sleek and lightweight design. Equipped with the latest processors, these laptops ensure smooth multitasking, whether you're working on a project, streaming videos, or gaming. The high-definition displays provide sharp, vibrant visuals, making them ideal for work or entertainment. With long battery life, these laptops keep you powered throughout the day, providing the ultimate combination of efficiency and convenience.`;

      case "Computers & Tablets":
        return `Whether you're seeking the power of a desktop computer or the flexibility of a tablet, our range of computers and tablets offers the best of both worlds. These devices are designed to provide high-performance computing for work, play, and everything in between. With crisp displays and fast processors, you'll experience smooth multitasking and vibrant visuals. Lightweight and portable, our devices are perfect for users who need both productivity and portability in one powerful package.`;

      default:
        return "Product details will be available soon.";
    }
  };
  const Loader = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-900 border-solid rounded-full animate-spin"></div>
    </div>
  );

  const handleOpenDialog = () => {};

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseSnakbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = async () => {
    if (auth.user == null) {
      setOpenSnackBar(true);
      setShowCart(true);
      setSeverity("warning");
      setSnakcbarMessage("You must be logged in to add product to cart");
      //  return navigate('/login');
      return;
    }
    const data = { productId, size: selectedSize ? selectedSize.name : "" };
    await dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };
  const handleReviewSubmit = async () => {
    if (auth.user == null) {
      setOpenSnackBar(true);
      setShowReview(true);
      setSeverity("warning");
      setSnakcbarMessage("You must be logged in to review the product");
      //  return navigate('/login');
      return;
    }
    const data = { productId, review: reviews };
    dispatch(createReview({ data, jwt }));
    setOpenSnackBar(true);
    setReviews("");
    setSeverity("success");
    setSnakcbarMessage("Thank you for your review");
  };

  useEffect(() => {
    const data = { productId: productId, jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId, isDialogOpen]);

  useEffect(() => {
    if (productId) fetchSuggestedProducts();
  }, [productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {customersProduct?.product &&
              breadCrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={"/"}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    {index < breadCrumbs.length - 1 && (
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
          </ol>
        </nav>

        {/* product details */}
        {loading ? (
          // Show skeleton loader while loading
          <ProductPageSkeleton loading={loading} />
        ) : (
          <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
            {/* Image gallery */}

            <div className="flex flex-col items-center ">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] sm:max-w-[20rem] sm:max-h-[25rem]">
                <img
                  src={activeImage?.src || customersProduct.product?.imageUrl}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image) => (
                <div
                  onClick={() => handleSetActiveImage(image)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={image.src}
                    alt={product.images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div> */}
            </div>

            {/* Product info */}
            <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
              {/* Product Brand and Title */}
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-xl font-bold tracking-tight text-gray-900">
                  {customersProduct.product?.brand}
                </h1>
                <h1 className="text-md lg:text-lg tracking-tight text-gray-600 pt-1">
                  {customersProduct.product?.title}
                </h1>
              </div>

              {/* Pricing Section */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                  <p className="font-semibold text-black">
                    ${customersProduct.product?.discountedPrice}
                  </p>
                  <p className="text-gray-400 line-through">
                    ${customersProduct.product?.price}
                  </p>
                  <p className="text-green-600 font-semibold">
                    {customersProduct.product?.discountPersent}% Off
                  </p>
                </div>

                {/* Reviews Section */}
                <div className="mt-6 flex items-center space-x-3">
                  {customersProduct.product && (
                    <Rating
                      name="read-only"
                      value={customersProduct.product?.averageRating}
                      precision={0.5}
                      readOnly
                    />
                  )}
                  <p className="text-sm text-gray-500">
                    {customersProduct.product?.numRatings == 1
                      ? "1 Rating"
                      : `${customersProduct.product?.numRatings} Ratings`}
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    {review?.reviews?.length > 1
                      ? review?.reviews?.length + " reviews"
                      : review?.reviews?.length + " review"}
                  </p>
                </div>

                {/* Sizes Section */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  type="submit"
                  className="mt-6 bg-gray-900 text-white font-medium rounded-lg py-3 px-6"
                  onClick={handleSubmit}
                  disabled={showCart}
                  sx={{
                    mt: 2,
                    backgroundColor: "#f5a623",
                    ":hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  Add To Cart
                </Button>
              </div>

              {/* Description and Details */}
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {customersProduct.product?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <h2 className="text-md font-medium text-black-900">
                    Details
                  </h2>
                  <div className="mt-2 space-y-4">
                    {details(secondLevelName)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* rating and review section */}
        <section className="px-4 md:px-8 lg:px-12">
          <div style={{ margin: "2rem", marginLeft: 0 }}>
            <h1 className="font-semibold text-lg pb-4">Suggested Products</h1>
            <Grid container spacing={2}>
              {suggestedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <Card
                    sx={{
                      maxWidth: 220,
                      mx: "auto",
                      boxShadow: 2,
                      borderRadius: 2,
                    }}
                  >
                    {product.imageUrl && (
                      <CardMedia
                        component="img"
                        height="120"
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{ objectFit: "contain", p: 1 }}
                      />
                    )}
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="body1" fontWeight={500} noWrap>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.discountedPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
                    {!suggestedProducts?.length && (
                      <NoDataCard
                        noDataFoundText="No Suggested Product Found"
                        styleCardProps={{ style: { height: 300 } }}
                        textProps={{ variant: 'h7', color: 'text.secondary', fontWeight: 500 }}
                      />
                    )}
            </Grid>
          </div>
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-4 md:p-5">
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <div className="space-y-5">
                  {review.reviews.length > 0 ? (
                    review.reviews.map((item, i) => (
                      <ProductReviewCard key={i} item={item} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl text-gray-500 shadow-sm mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mb-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 9.75h.008v.008H9.75V9.75zM12 9.75h.008v.008H12V9.75zM14.25 9.75h.008v.008H14.25V9.75zM12 20.25c4.694 0 8.5-3.806 8.5-8.5s-3.806-8.5-8.5-8.5-8.5 3.806-8.5 8.5 3.806 8.5 8.5 8.5z"
                        />
                      </svg>
                      <p className="text-lg font-medium">
                        No reviews available yet
                      </p>
                      <p className="text-sm text-gray-400">
                        Be the first to share your thoughts!
                      </p>
                    </div>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} md={5}>
                <h2 className="text-lg md:text-xl font-bold pb-1">
                  Rate this product
                </h2>
                <div className="flex items-center space-x-3 pb-10">
                  {customersProduct.product && (
                    <Rating
                      name="product-rating"
                      value={customersProduct?.product?.averageRating}
                      onChange={(event, newValue) => {
                        setDialogOpen(true);
                      }}
                    />
                  )}
                  <RateProductDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    productId={productId}
                    token={jwt}
                    auth={auth}
                  />
                </div>
                <Box>
                  <h2 className="text-lg md:text-xl font-bold pb-1">
                    Write a review
                  </h2>
                  <TextField
                    required
                    label="Your Review"
                    multiline
                    rows={4}
                    className="mb-3"
                    variant="outlined"
                    fullWidth
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReviewSubmit}
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#111827",
                      ":hover": {
                        backgroundColor: "#14B8A6",
                      },
                    }}
                    disabled={showReview}
                  >
                    Submit Review
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* similer product */}
        {/* <section className=" pt-10">
          <h1 className="py-5 text-xl font-bold">Similer Products</h1>
          <div className="flex flex-wrap space-y-5">
            {gounsPage1.map((item) => (
              <HomeProductCard product={item} />
            ))}
          </div>
        </section> */}
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnakbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnakbar}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {snackbarMeassage}
          </Alert>
        </Snackbar>
        <section>{/* <BackdropComponent open={loading} /> */}</section>
      </div>
    </div>
  );
}

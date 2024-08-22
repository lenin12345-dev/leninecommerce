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
  TextField
} from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews,createReview } from "../../../../Redux/Customers/Review/Action";
import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import RateProductDialog from "./RateProductDialog";

const product = {
  name: "Basic Tee 6-Pack",
  price: "₹996",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

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
  const { productId } = useParams();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [snackbarMeassage,setSnakcbarMessage] = useState('')
  const [severity,setSeverity] = useState('')
  const [reviews,setReviews] = useState('')

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
      setSeverity('warning')
      setSnakcbarMessage('You must be logged in to add product to cart')
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
      setShowReview(true)
      setSeverity('warning')
      setSnakcbarMessage('You must be logged in to review the product')
      //  return navigate('/login');
      return;
    }
    const data = { productId,review:reviews };
     dispatch(createReview({data,jwt}))
     setOpenSnackBar(true);
     setReviews('')
     setSeverity('success')
     setSnakcbarMessage('Thank you for your review')
  };


  useEffect(() => {
    const data = { productId: productId, jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId, isDialogOpen]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={"/"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
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
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* product details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center ">
            <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || customersProduct.product?.imageUrl}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
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
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {customersProduct.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {customersProduct.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  ${customersProduct.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  ${customersProduct.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  {customersProduct.product && (
                    <Rating
                      name="read-only"
                      value={customersProduct.product?.averageRating}
                      precision={0.5}
                      readOnly
                    />
                  )}

                  <p className="opacity-60 text-sm">
                    {customersProduct.product?.numRatings == 1
                      ? "1 Rating"
                      : `${customersProduct.product?.numRatings} Ratings`}{" "}
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>

              {/* <form className="mt-10" onSubmit={handleSubmit}> */}
              {/* Sizes */}
              <div className="mt-10">
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
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-1 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
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

              <Button
                variant="contained"
                type="submit"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                onClick={handleSubmit}
                disabled={showCart}
              >
                Add To Cart
              </Button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {customersProduct.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {review.reviews?.map((item, i) => (
                    <ProductReviewCard item={item} />
                  ))}
                </div>
              </Grid>
          
                <Grid item xs={5}>
                  <h2 className="text-xl font-bold pb-1">Rate this product</h2>
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
                    />
                  </div>
                  <Box>
                  <h2 className="text-xl font-bold pb-1">Write a review</h2>
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
                    style={{ margin:3,marginTop:7}}
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
      </div>
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import Homepage from "../Pages/Homepage";
import Cart from "../customer/Components/Cart/Cart";
import { ThemeProvider } from "@mui/material/styles";
import { customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
import NotFound from "../Pages/Notfound";
import UserDashboard from "../customer/Components/Profile/UserDashboard";
import ProtectedRoute from "../ProtectedRoute";

const CustomerRoutes = () => {
 return (
    <>
      <ThemeProvider theme={customerTheme}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Homepage />} />
          <Route path="/register" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />    
          <Route path="/products" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />

          {/* ✅ Protected Customer Routes */}
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/order/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/rate/:productId"
            element={
              <ProtectedRoute>
                <RateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default CustomerRoutes;

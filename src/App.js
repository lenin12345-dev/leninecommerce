import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPannel from "./Admin/AdminPannel";
import ProtectedRoute from "./ProtectedRoute";
import Navigation from "../src/customer/Components/Navbar/Navigation";
import { getUser } from "./Redux/Auth/Action";
import { getCart } from "./Redux/Customers/Cart/Action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt, dispatch]);
  const showNavbar = !location.pathname.startsWith("/admin");
  return (
    <>
        {showNavbar && <Navigation />} 
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPannel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;

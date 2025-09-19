import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../src/Redux/Auth/Action";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    //Because Redux resets on page reload, auth.user will usually be null after refresh.
    // This makes an API call with the JWT to fetch the user’s profile and repopulate Redux.
    // Prevents the “flash logout” issue where you see the login page for a split second after refreshing.
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch, auth.user]);

  
  if (auth.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "80%",
          maxWidth: 500,
          margin: "2rem auto",
        }}
      >
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  }

  if (!auth.isLoading && !auth.user) {
    // replace ensures they can’t go back to the protected page with the back button
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

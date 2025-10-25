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

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }
  //  Show loader only when JWT exists AND user is still loading
  if (auth.isLoading && jwt) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          height: "100vh", 
          width: "100vw",
          backgroundColor: "#f9f9f9", 
        }}
      >
        <Skeleton variant="rectangular" width="80%" height={80} />
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="80%" height={300} />
        <Skeleton variant="text" width="50%" height={40} />
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

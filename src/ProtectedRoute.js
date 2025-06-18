import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../src/Redux/Auth/Action";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  console.log(auth)
  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch, auth.user]); // ⚠️ Remove isLoading

  if (auth.isLoading) {
    return <p>Loading...</p>; // or your Backdrop spinner
  }

  if (!auth.isLoading && !auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

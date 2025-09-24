import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400, md: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function AuthModal({ handleClose, open, setOpenAuthModal }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  // Snackbar state moved here
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  useEffect(() => {
    if (auth.user) {
      handleClose();
      if (auth.user?.role === "ADMIN") {
        navigate("/admin");
      }
    }
  }, [auth.user, handleClose, navigate]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="rounded-md" sx={style}>
          {location.pathname === "/login" ? (
            <LoginUserForm
              setSnackBarMessage={setSnackBarMessage}
              setSnackBarSeverity={setSnackBarSeverity}
              setOpenSnackBar={setOpenSnackBar}
              setOpenAuthModal={setOpenAuthModal}
            />
          ) : (
            <RegisterUserForm
              setSnackBarMessage={setSnackBarMessage}
              setSnackBarSeverity={setSnackBarSeverity}
              setOpenSnackBar={setOpenSnackBar}
              setOpenAuthModal={setOpenAuthModal}
            />
          )}
        </Box>
      </Modal>

      {/* Snackbar centralized here */}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

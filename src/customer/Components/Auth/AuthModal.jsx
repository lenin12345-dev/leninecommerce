import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '90%', sm: 400, md: 500 },  // Responsive width for different screen sizes
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

export default function AuthModal({ handleClose, open,setOpenAuthModal }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate=useNavigate()
  useEffect(() => {
    if (auth.user){
       handleClose();
       if(auth.user?.role==="ADMIN"){
        navigate('/admin')
       }
      }
  }, [auth.user]);
  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="large"
    >
      <Box className="rounded-md" sx={style}>
        {location.pathname === "/login" ? (
          <LoginUserForm />
        ) : (
          <RegisterUserForm setOpenAuthModal={setOpenAuthModal} />
        )}
      </Box>
    </Modal>
    
    </>
    
  );
}

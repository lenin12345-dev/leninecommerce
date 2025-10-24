import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ auth, onLogout, openAuthModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(null);
    navigate("/account/order");
  };

  if (!auth.user) {
    return (
      <Button
        sx={{
          fontWeight: "bold",
          color: "white",
          textTransform: "none",
        }}
        onClick={openAuthModal}
      >
        {" "}
        Sign In
      </Button>
    );
  }

  return (
    <>
      <Avatar
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ bgcolor: "#14B8A6", cursor: "pointer" }}
      >
        {auth.user?.firstname?.[0]?.toUpperCase()}
      </Avatar>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleClick}>My Orders</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CartButton({ count }) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/cart")} className="text-gray-300 hover:text-white">
      <ShoppingCartIcon />
      <span className="ml-2 text-sm font-medium">{count}</span>
    </Button>
  );
}

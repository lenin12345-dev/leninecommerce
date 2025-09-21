import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { navigation } from "../../../config/navigationMenu";

export default function MobileMenu({ open, setOpen, auth, onLogout, onLogin }) {
  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      {/* Close Button */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}
      >
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Menu Links */}
      <List sx={{ width: 250 }}>
        {navigation.categories.map((cat) => (
          <ListItem
            button
            key={cat.name}
            component={Link}
            to="/products"
            onClick={() => setOpen(false)}
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>

      <Divider />
    </Drawer>
  );
}

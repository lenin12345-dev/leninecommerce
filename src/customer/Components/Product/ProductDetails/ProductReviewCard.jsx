import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch,useSelector } from "react-redux";
import { deleteReview } from "../../../../Redux/Customers/Review/Action";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Snackbar,
  Alert,
  TextField,
  Avatar
} from "@mui/material";

const ProductReviewCard = ({ item }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReview(item._id, auth.jwt));
  };

  const isOwnReview = auth.user?._id === item?.user?._id;

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2} md={1}>
          <Box>
            <Avatar
              sx={{ width: 56, height: 56, bgcolor: "grey" }}
              alt={item?.user?.firstname}
            >
              {item?.user?.firstname[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9} sm={10} md={11}>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-base md:text-lg">
                  {item?.user?.firstname}
                </p>
             
              </div>
              {isOwnReview && (
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              )}
            </div>
            <p className="text-sm md:text-base">{item?.review}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;

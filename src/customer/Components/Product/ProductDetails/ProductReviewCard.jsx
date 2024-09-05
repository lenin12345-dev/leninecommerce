import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";

const ProductReviewCard = ({ item }) => {
  const [value, setValue] = React.useState(4.5);
  const date = new Date(item.createdAt);
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`; // e.g., "August 19, 2024"

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2} md={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#111827" }}
              alt={item?.user?.firstname}
              src=""
            >
              {item?.user?.firstname[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9} sm={10} md={11}>
          <div className="space-y-2">
            <div className="">
              <p className="font-semibold text-base md:text-lg">
                {item?.user?.firstname}
              </p>
              <p className="opacity-70 text-sm md:text-base">{formattedDate}</p>
            </div>
            <div>{/* Optional content */}</div>
            <p className="text-sm md:text-base">{item?.review}</p>
          </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;

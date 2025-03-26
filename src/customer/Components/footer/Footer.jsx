import { Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      className="bg-black text-white mt-10 text-center"
      sx={{ bgcolor: "black", color: "white", py: 3 }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          Lenin Store
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Edison,New Jersey
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          Policies
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Privacy Policy
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          Terms Of Service
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Terms
        </Typography>
      </Grid>
      <Grid item xs={12} className="pt-10">
        <Typography variant="body2" component="p" align="center">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

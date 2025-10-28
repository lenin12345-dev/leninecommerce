import Grid from "@mui/material/Grid";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import RecentOrders from "../tables/RecentOrders";



const Dashboard = () => {
  return (
    <>
      <ThemeProvider theme={customTheme}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <CustomersTable />
            </Grid>
            <Grid item xs={12}  md={8}>
              <RecentOrders />
            </Grid>
             <Grid item xs={12} md={12}>
              <RecentlyAddeddProducts />
            </Grid>
          </Grid>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;

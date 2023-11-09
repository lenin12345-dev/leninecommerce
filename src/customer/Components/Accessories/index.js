import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {Card} from "@mui/material";
// import CardContent from "@mui/material/core/CardContent";
import {Button} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    accessories: {
    margin: 3,
    maxWidth: "100%", 
    overflow: "hidden"
  },

 
  img: {
    width: "100%",
    height:'auto',
    objectFit: "cover",
  },
}));

const Accessories = () => {
  const classes = useStyles();
  // const navigate = useNavigate();


  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
    <div className={classes.accessories}>
    <img src={'https://images.luxurybycici.com/category_images/Man-Accessories.png'} 
    alt="" 
    className={classes.img} />
     
    </div>
    </div>

  );
};

export default Accessories;

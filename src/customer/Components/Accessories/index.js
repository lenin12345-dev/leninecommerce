import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  accessoriesContainer: {
    width: "100%",
    position: "relative", 
    overflow: "hidden",
    margin: 0,
    padding: 0,
  },
  img: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  overlayTextContainer: {
    position: "absolute",
    top: "50%", 
    left: "5%", 
    transform: "translateY(-50%)",
    padding: "2rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    color: "#fff",
    maxWidth: "50%",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "60%",
      padding: "1.5rem",
      left: "3%",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "40%",
      padding: "1rem",
      left: "2%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "47%",
      padding: "0.8rem",
      left: "1%",
      top: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "47%",
      padding: "0.5rem",
      top: "50%",
      left: "0 ",
      textAlign: "center",
    },
  },
  overlayText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    textAlign: "left",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  buttonStyle: {
    marginTop: "1rem",
    backgroundColor: "#f5a623", 
    color: "#fff", 
    fontWeight: "bold", 
    padding: "8px 16px", 
    fontSize: "16px", 
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
    transition: "background-color 0.3s ease, transform 0.3s ease", 
    "&:hover": {
      backgroundColor: "black", 
      transform: "scale(1.05)", 
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "10px",
      padding: "7px 14px",
      fontSize: "14px", 
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "8px",
      padding: "4px 9px", 
      fontSize: "12px", 
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%", 
      padding: "4px 9px", 
      fontSize: "10px", 
    },
  }
  
}));

const Accessories = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/products');
  };

  return (
    <div className={classes.accessoriesContainer}>
      <img
        src={'https://img.freepik.com/premium-photo/vr-goggles-with-holographic-shopping-bags-concept-as-horizontal-shot-vr-goggles-white-surfac_980716-654526.jpg?w=1380'}
        alt="Accessories"
        className={classes.img}
      />
      <div className={classes.overlayTextContainer}>
        <div className={classes.overlayText}>
          Discover Our New Accessories Collection! <br />
          Stay ahead with the latest trends and styles.
        </div>
        <button
          onClick={handleButtonClick}
          className={classes.buttonStyle}
          variant="contained"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Accessories;

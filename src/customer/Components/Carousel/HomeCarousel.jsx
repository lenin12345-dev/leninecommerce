import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const useStyles = makeStyles((theme) => ({
  carouselCard: {
    height: "60vh",
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      height: "50vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "30vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "25vh",
    },
  },
  button: {
    position: "absolute",
    left: "2%", 
    top: "64%", 
    marginTop:26,
    transform: "translateY(-50%)",
    padding: "10px 20px",
    backgroundColor: "#f5a623",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "black",
      transform: "scale(1.01)",
    },
    
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
      padding: "8px 16px",
    top: "64%", 

      marginTop:26,
      left:"2%"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
      padding: "6px 14px",
      left: "2%", 
      marginTop:26,

    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
      padding: "3px 6px",
      left: "4%", 

      marginTop:17,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "7px",
      padding: "2px 4px",
      marginTop:10,
    },
    '&:hover': {
      backgroundColor: "#000", 
      color: "#fff", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", 
    },
  },
  marketingTextContainer: {
    position: "absolute",
    left: "5%", 
    top: "50%", 
    color: "#fff",
    maxWidth: "600px", 
    transform: "translateX(-10%)",
    [theme.breakpoints.down("lg")]: {
      top: "48%",
      left: "17px", 
      transform: "translateX(0)",
    },
    
    [theme.breakpoints.down("sm")]: {
      top: "32%",
      maxWidth: "150px",
      left: "15px", 
      transform: "translateX(0)",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "250px",
    },
  },
  marketingText: {
    fontSize: "30px",
    fontWeight: "bold",
    lineHeight: "1.4",
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
}));

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const item = homeCarouselData.map((item) => (
    <div className={classes.carouselCard} key={item.id}>
      <img
        className="cursor-pointer"
        onClick={() => navigate("/products")}
        src={item.image}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          imageRendering: "crisp-edges",
        }}
        alt="Carousel Item"
        onDragStart={handleDragStart}
        role="presentation"
      />

      {/* Marketing Text */}
      <div className={classes.marketingTextContainer}>
        <div className={classes.marketingText}>
          Shop now and stay ahead of the trends.
        </div>
      </div>

      <button
        onClick={() => navigate("/products")}
        className={classes.button}
      >
        Go to Collection
        <ArrowForwardIcon className={classes.arrow} />
      </button>
    </div>
  ));

  return (
    <div style={{ position: "relative" }}>
      <AliceCarousel
        mouseTracking
        items={item}
        autoPlay
        infinite
        autoPlayInterval={2000}
        disableButtonsControls
      />
    </div>
  );
};

export default HomeCarousel;

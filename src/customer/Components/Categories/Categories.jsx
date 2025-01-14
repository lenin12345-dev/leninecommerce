import React from "react";
import { makeStyles } from "@mui/styles";
import {Button} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  categories: {
    display: "flex",
    height: "80vh",
    gap: '10px',
    margin: 4,
  },
  col: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  colL: {
    flex: 2,
  },
  row: {
    flex: 1,
    display: "flex",
    position: "relative",
    overflow: "hidden",
  },
  button: {
    position: "absolute",

    padding: '10px',
    top: 10,
    left:-150,
    margin: "auto",
    cursor: "pointer",
   
  },
  img: {
    minWidth: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const Categories = () => {
  const classes = useStyles();

  const renderCard = (imageSrc, linkTo, buttonText) => (
    <div className={classes.row}>
      <img src={imageSrc} alt="" className={classes.img} />
      <div >

      <Button className={classes.button} size='small' variant='outlined'style={{ textTransform: "uppercase",
    fontWeight: 600,
    color:'white' }}   href={linkTo}>
        {buttonText}
      </Button>
    </div>

    </div>
  );

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
    <div className={classes.categories}>
      <div className={classes.col}>
        {renderCard(
          "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "/women/clothing/women_dress",
          "Sale"
        )}
        {renderCard(
          "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "women/clothing/women_dress",
          "Women"
        )}
      </div>
      <div className={classes.col}>
        {renderCard(
          "https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "/women/clothing/women_dress",
          "New Season"
        )}
      </div>
      <div className={`${classes.col} ${classes.colL}`}>
        <div className={classes.row}>
          {renderCard(
            "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "/women/clothing/women_dress",
            "Men"
          )}
        </div>
        <div className={classes.row}>
          {renderCard(
            "https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "/women/clothing/women_dress",
            "Brands"
          )}
        </div>
        <div className={classes.row}>
          {renderCard(
            "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "/women/clothing/women_dress",
            "Shoes"
          )}
        </div>
      </div>
    </div>
    </div>

  );
};

export default Categories;

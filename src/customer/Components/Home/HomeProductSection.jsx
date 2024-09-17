import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
const HomeProductSection = ({ section, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: {
      items: 2,
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5,
      itemsFit: "contain",
    },
  };
  const items = data?.slice(0, 10).map((item) => (
    <div key={item._id} >
      {" "}
      <HomeProductCard  product={item} />
    </div>
  ));
   

  // const slideInFromRight = (t) => {s
  //   return `translateX(${100 - t * 100}%)`;
  // };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
     <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-extrabold text-gray-900 py-3 sm:py-5">
  {section}
</h2>
      <div className="relative border p-5">
        <AliceCarousel
          // disableButtonsControls ={true}
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={2000}
          // autoPlay={true}
          // autoPlayInterval={5000}
          keyboardNavigation={true}
          renderPrevButton={() => {
            return     <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50"
            color="white"
            disabled ={activeIndex===0}
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%)  rotate(90deg)",
            }}
            aria-label="previous"
          >
            <ArrowForwardIosIcon
              className=""
              sx={{ transform: " rotate(90deg)" }}
            />
          </Button>
          }}
          renderNextButton={() => {
            return     <Button
            onClick={slideNext}
            variant="contained"
            className="z-50"
            disabled ={activeIndex === items.length - 5 }
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
            }}
            color="white"
            aria-label="next"
          >
            <ArrowForwardIosIcon
              className=""
              sx={{ transform: "rotate(-90deg)" }}
            />
          </Button>
          }}
        />
      </div>
    </div>
  );
};

export default HomeProductSection;

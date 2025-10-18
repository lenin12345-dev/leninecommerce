import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
const HomeProductSection = ({ section, data = [],loading,error }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getVisibleItems = () => {
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 568) return 3;
    return 2;
  };

  const maxIndex = Math.max(0, data.length - getVisibleItems());

  const slidePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const slideNext = () =>
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
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
  const items = data.slice(0, 10).map((item) => (
    <div key={item._id}>
      {" "}
      <HomeProductCard product={item} />
    </div>
  ));
    if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse h-64 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }
    if (error) {
      return (
        <div className="flex justify-center items-center h-[50vh] text-red-500">
          Failed to load products: {error}
        </div>
      );
    }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-extrabold text-gray-900 py-3 sm:py-5">
        {section}
      </h2>
      <div className="relative border p-5">
        {items.length > 0 ? (
          <AliceCarousel
            disableDotsControls
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={responsive}
            onSlideChanged={syncActiveIndex}
            animationType="fadeout"
            animationDuration={2000}
            keyboardNavigation={true}
            renderPrevButton={() => (
              <Button
                onClick={slidePrev}
                variant="contained"
                className="z-50"
                color="white"
                disabled={activeIndex === 0}
                sx={{
                  position: "absolute",
                  top: "8rem",
                  left: "0rem",
                  transform: "translateX(-50%) rotate(90deg)",
                }}
                aria-label="previous"
              >
                <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
              </Button>
            )}
            renderNextButton={() => (
              <Button
                onClick={slideNext}
                variant="contained"
                className="z-50"
                disabled={activeIndex === maxIndex}
                sx={{
                  position: "absolute",
                  top: "8rem",
                  right: "0rem",
                  transform: "translateX(50%) rotate(90deg)",
                }}
                color="white"
                aria-label="next"
              >
                <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
              </Button>
            )}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;

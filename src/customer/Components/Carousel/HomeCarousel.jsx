import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const item = homeCarouselData.map((item) => (
    <div style={{ maxHeight:700}} className="home_carousel__card" key={item.id}>
    <img
      className="cursor-pointer"
      onClick={() => navigate(item.path)}
      src={item.image}
      style={{height:'100%',width:'100%'}}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
    />
    </div>
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;

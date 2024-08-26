import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import image1 from "../../../static/image1.jpg"
import image2 from "../../../static/image2.jpg"
import { useNavigate } from "react-router-dom";

const SlidingImage = styled("img")(({ theme, direction, isVisible }) => ({
  width: "45%",
  transition: "transform 0.5s ease-in-out",
  height:"60vh",
  cursor:"pointer",
  transform: isVisible
    ? "translateX(0)"
    : direction === "left"
    ? "translateX(-100%)"
    : "translateX(100%)",
}));

const SlidingImagesSection = () => {
    // A reference to the container element, used for observing its visibility in the viewport.
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // An IntersectionObserver is used to observe when the section containing the images becomes visible in the viewport
    const observer = new IntersectionObserver(    
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const handleImageClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "50px",
        overflow: "hidden",
        position: "relative",
    
      }}
    >
  
         <SlidingImage
        src={image1}
        alt="Image 1"
        direction="left"
        isVisible={isVisible}
        onClick={() => handleImageClick("/products")}
      />
 
    
      <SlidingImage
        src={image2}
        alt="Image 2"
        direction="right"
        isVisible={isVisible}
        onClick={() => handleImageClick("/products")}
      />
       
    </Box>
  );
};

export default SlidingImagesSection;

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Use high-quality images
import image1 from "../../../static/image1.jpg";
import image2 from "../../../static/image2.jpg";

const SlidingImage = styled("img")(({ theme, direction, isVisible }) => ({
  height: "auto",
  width:"auto",
  cursor: "pointer",
  transition: "transform 0.5s ease-in-out",
  transform: isVisible
    ? "translateX(0)"
    : direction === "left"
    ? "translateX(-100%)"
    : "translateX(100%)",
  objectFit: "cover", 
  objectPosition: "center",


  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
    transform: isVisible
      ? "translateX(0)"
      : direction === "left"
      ? "translateX(-100%)"
      : "translateX(100%)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    height: "auto",
  },
}));

const SlidingImagesSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
        overflow: "hidden",
        position: "relative",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-center" },
        justifyContent:"space-around"
      }}
    >
      <SlidingImage
        src={image1}
        alt="Image 1"
        direction="left"
        isVisible={isVisible}
        onClick={() => handleImageClick("/products")}
        srcSet={`
          ${image1}?w=480 480w, 
          ${image1}?w=768 768w, 
          ${image1}?w=1200 1200w, 
          ${image1} 1600w
        `}
        sizes="
          (max-width: 600px) 100vw, 
          (max-width: 960px) 70vw, 
          41vw"
      />
      <SlidingImage
        src={image2}
        alt="Image 2"
        direction="right"
        isVisible={isVisible}
        onClick={() => handleImageClick("/products")}
        srcSet={`
          ${image2}?w=480 480w, 
          ${image2}?w=768 768w, 
          ${image2}?w=1200 1200w, 
          ${image2} 1600w
        `}
        sizes="
          (max-width: 600px) 100vw, 
          (max-width: 960px) 70vw, 
          41vw"
      />
    </Box>
  );
};

export default SlidingImagesSection;

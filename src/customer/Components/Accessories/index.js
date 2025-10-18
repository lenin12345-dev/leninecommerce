import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Accessories = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/products");
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        m: 0,
        p: 0,
      }}
    >
      <Box
        component="img"
        src="https://img.freepik.com/premium-photo/vr-goggles-with-holographic-shopping-bags-concept-as-horizontal-shot-vr-goggles-white-surfac_980716-654526.jpg?w=1380"
        alt="Accessories"
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: "1%", sm: "2%", md: "5%" },
          transform: "translateY(-50%)",
          p: { xs: "0.8rem", sm: "1rem", md: "1.5rem", lg: "2rem" },
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: { xs: "47%", sm: "47%", md: "40%", lg: "50%" },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            lineHeight: 1.2,
            fontSize: {
              xs: "0.8rem",
              sm: "0.8rem",
              md: "1.1rem",
              lg: "1.4rem",
            },
            textAlign: "left",
          }}
        >
          Discover Our New Accessories Collection! <br />
          Stay ahead with the latest trends and styles.
        </Typography>

        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{
            mt: { xs: "8px", md: "10px", lg: "1rem" },
            backgroundColor: "#f5a623",
            color: "#fff",
            fontWeight: "bold",
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 0.5, sm: 0.7, md: 1 },
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              backgroundColor: "black",
              transform: "scale(1.05)",
            },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default Accessories;

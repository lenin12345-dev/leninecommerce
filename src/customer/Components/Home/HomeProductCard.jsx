import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="cursor-pointer flex flex-col bg-white rounded-xl shadow-md overflow-hidden mx-2 sm:mx-3 md:mx-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{ minHeight: "18rem" }} // Ensures card doesn’t shrink
    >
      {/* Image Container */}
      <div className="flex justify-center items-center bg-gray-50 w-full h-48 sm:h-52 md:h-56">
        <img
          className="object-contain h-full w-auto"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col justify-between flex-grow text-center">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {product?.brand || "Unknown Brand"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product?.title || "Untitled Product"}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;

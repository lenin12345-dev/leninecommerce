import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="cursor-pointer flex flex-col mb-1 bg-white rounded-lg shadow-lg overflow-hidden mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[20rem] transition-transform transform hover:scale-105"
    >
      <div className="relative w-full mb-1">
        <img
          className="object-contain w-full h-[10rem] sm:h-[12rem] md:h-[14rem]"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>
      <div className="sm:p-2 md:p-2 text-center flex flex-col justify-between ">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">
          {product?.brand}
        </h3>
        <p className="mt-1 text-xs sm:text-xs md:text-sm lg:text-base text-gray-500">
          {product?.title}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;

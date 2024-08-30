import React from 'react';
import "./ProductCard.css";
import{useLocation, useNavigate} from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, brand, imageUrl, price ,discountedPrice,color,discountPersent} = product;
  const navigate= useNavigate();
  

  const handleNavigate=()=>{
    navigate(`/product/${product?._id}`)
  }

  return (
    <div onClick={handleNavigate} className="productCard w-[14rem] border m-4 rounded-lg overflow-hidden shadow-lg transition-all cursor-pointer hover:shadow-xl">
      <div className="imageWrapper h-[12rem] bg-gray-100">
        <img className="productImage h-full w-full object-contain" src={imageUrl} alt={title} />
      </div>
      <div className="textPart bg-white p-4">
        <div>
          <p className=" text-md font-bold text-gray-700">{brand}</p>
          <p className=  " text-sm text-gray-900">{title}</p>
          <p className=" text-sm text-gray-600">{color}</p>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <p className="font-semibold text-sm text-gray-800">${discountedPrice}</p>
          {discountedPrice !== price && (
            <>
              <p className="text-gray-500 line-through">${price}</p>
              <p className="text-green-600 font-semibold">{discountPersent}% off</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

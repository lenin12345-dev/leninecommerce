import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { mens_collection } from "../Data/Men/men_collection";
import { womens_collection } from "../Data/Women/women_collection";
import Accessories from '../customer/Components/Accessories';
import { accessories } from '../customer/Components/Accessories/accessories';
import Categories from '../customer/Components/Categories/Categories';
import SlidingImagesSection from "../customer/Components/Home/SlidingImagesSection"; 


const Homepage = () => {
  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <HomeProductSection data={mens_collection} section={"Men's Collection"} />
        {/* <Categories /> */}
        <SlidingImagesSection 
        />
        <HomeProductSection data={womens_collection} section={"Women's Collection"} />
        <Accessories />
        <HomeProductSection data={accessories} section={"Accessories"} />
      </div>
    </div>
  );
};

export default Homepage;

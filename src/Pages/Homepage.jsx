import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { sareePage1 } from "../Data/Saree/page1";
import { dressPage1 } from "../Data/dress/page1";
import { gounsPage1 } from "../Data/Gouns/gouns";
import { kurtaPage1 } from "../Data/Kurta/kurta";
import { mensShoesPage1 } from "../Data/shoes";
import { mens_kurta } from "../Data/Men/men_kurta";
import { mens_collection } from "../Data/Men/men_collection";
import { womens_collection } from "../Data/Women/women_collection";
import { lengha_page1 } from "../Data/Women/LenghaCholi";
import Categories from '../customer/Components/Categories/Categories'
import Accessories from '../customer/Components/Accessories';
import {accessories} from '../customer/Components/Accessories/accessories';



const Homepage = () => {

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
      <HomeProductSection data={mens_collection} section={"Men's Collection"} />
        <Categories />
        <HomeProductSection data={womens_collection} section={"Women's Collection"} />
        <Accessories />
        {/* <HomeProductSection data={dressPage1} section={"Dress"} />*/}
        <HomeProductSection data={accessories} section={"Accessories"} /> 
        {/* <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} /> */}
        {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
      </div>

      
    </div>
  );
};

export default Homepage;

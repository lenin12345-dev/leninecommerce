import React,{useEffect} from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { mens_collection } from "../Data/Men/men_collection";
import { womens_collection } from "../Data/Women/women_collection";
import Accessories from '../customer/Components/Accessories';
import Categories from '../customer/Components/Categories/Categories';
import SlidingImagesSection from "../customer/Components/Home/SlidingImagesSection"; 
import { useDispatch, useSelector } from "react-redux";
import {
  findProducts,
} from "../Redux/Customers/Product/Action";


const Homepage = () => {
  const dispatch = useDispatch();

  const { customersProduct } = useSelector((store) => store);
  const { content = [] } = customersProduct.products || {};



  useEffect(() => {
    const data = {
      pageSize: 50,

    };
    dispatch(findProducts(data));
  }, [dispatch]);

const filterByCategory = (data,categoryName)=>{
    return data.filter((each)=>{
    const name = each.category?.parentCategory?.parentCategory?.name;
    return name == categoryName
    })
  
}
  // Filter men data
  const menData = filterByCategory(content,'Men')
  const womenData = filterByCategory(content,'Women')
  const accessories = filterByCategory(content,'Electronics')




  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <HomeProductSection data={menData} section={"Men's Collection"} />
        {/* <Categories /> */}
        <SlidingImagesSection 
        />
        <HomeProductSection data={womenData} section={"Women's Collection"} />
        <Accessories />
        <HomeProductSection data={accessories} section={"Accessories"} />
      </div>
    </div>
  );
};

export default Homepage;

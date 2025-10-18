import React, { useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import Accessories from "../customer/Components/Accessories";
import SlidingImagesSection from "../customer/Components/Home/SlidingImagesSection";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../Redux/Customers/Product/Action";

const Homepage = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (store) => store.customersProduct
  );
  const { content = [] } = products || {};

  useEffect(() => {
    const data = {
      pageSize: 50,
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  const filterByCategory = (data, categoryName) => {
    return data.filter((each) => {
      const name = each.category?.parentCategory?.parentCategory?.name;
      return name == categoryName;
    });
  };
  // Filter men data
  const menData = filterByCategory(content, "Men");
  const womenData = filterByCategory(content, "Women");
  const accessories = filterByCategory(content, "Electronics");

  return (
    <>
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <HomeProductSection data={menData} loading={loading} error={error} section={"Men's Collection"} />
        {/* <Categories /> */}
        <SlidingImagesSection />
        <HomeProductSection data={womenData} section={"Women's Collection"} />
        <Accessories />
        <HomeProductSection data={accessories} section={"Accessories"} />
      </div>
    </>
  );
};

export default Homepage;

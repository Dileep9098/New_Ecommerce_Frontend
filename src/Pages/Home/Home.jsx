import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import HomeBanner from '../../Comoponant/Home/HomeBanner';
import CategoryFeature from '../../Comoponant/Home/CategoryFeature';
import PopularProduct from '../../Comoponant/Home/PopularProduct';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showErrorMsg } from '../../utils/ShowMessages';
import HotDealBanner from '../../Comoponant/Home/HotDealBanner';
import DailyBestSells from '../../Comoponant/Home/DailyBestSells';
import GeneralInfo from '../../Comoponant/Home/GeneralInfo';
import CampaignSection from '../../Comoponant/Home/CompainingSection';
import NewProduct from '../../Comoponant/Home/NewProduct';
import ShowcategoryHome from '../../Comoponant/Home/ShowcategoryHome';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Store/Feature/product/productSlice';
export default function Home() {

    const [allProduct, setAllProduct] = useState([]);
    const { isLoading, products, productCount } = useSelector((state) => state.product)

    const dispatch = useDispatch();

    useEffect(() => {
       

        // Fetch products with parameters
        const param = {
            CategoryID: "0",
            ManufacturerID: "",
            MaxPrice: null,
            MinPrice: null,
            OrderByColumnName: "",
            PageNo: 1,
            PageSize: 10,
            Rating: null,
            SearchTerm: "",
            SizeID: ""
        };

        dispatch(getAllProducts({ param, CategoryName: "" }));
    }, [dispatch]);

    // console.log("All Product from state", allProduct);
    // console.log("All Product from Redux", products);

    return (
        <>
            <ShowcategoryHome />
            <HomeBanner />
            <PopularProduct allProduct={products||[]} />
            <CategoryFeature />
            <GeneralInfo />
            {/* <HotDealBanner /> */}
            <DailyBestSells allProduct={products||[]} />
            <CampaignSection />
            <NewProduct AllProducts={products} />



        </>
    )
}

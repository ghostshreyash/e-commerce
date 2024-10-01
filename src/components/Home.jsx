import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "./LottieAnimation";
import basket from '../assets/lotties/basket.json';
import loader from "../assets/lotties/loader.json";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch product categories from fakestoreapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from fakestoreapi based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          selectedCategory
            ? `https://fakestoreapi.com/products/category/${selectedCategory}`
            : "https://fakestoreapi.com/products"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4">

      <img src="./assets/banner.jpg" className=" w-screen h-auto mb-4" onClick={()=> navigate("/products")} />
      <Toaster />

      
      <div className="w-[80%] mx-auto flex items-center justify-between py-2 mb-5">
        <div className="h-full flex justify-center items-center gap-4">
          <span className=" ml-0 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center bg-black text-2xl text-white rounded-full">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10H20L11 23V14H4L13 1V10Z"></path>
            </svg>
          </span>
          <h1 className="ml-2 text-xl font-bold">Flash Sale</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.slice(0,4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <LottieAnimation animationData={loader} />
          </div>
        )}
      </div>

      <div className="h-[30vh] mt-12 md:mt-0 flex flex-col md:flex-row items-center justify-center">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-32 w-32 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z"></path>
        </svg>
        <p className="text-xl mx-7 font-bold tracking-normal md:tracking-wide [word-spacing:7px] text-center">Discover the future of shopping — where every click brings your style to life.</p>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-32 w-32 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
        </svg>
      </div>

      <img src="./assets/banner-3.jpg" className=" w-screen h-auto mb-4" onClick={()=> navigate("/products")} />

      <hr />

      <div className="mb-6 text-center">
        <h2 className=" text-3xl font-semibold mb-4">Categories</h2>
        <div className="flex space-x-4 items-center justify-center gap-3">
        <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedCategory === ""
                ? "bg-purple-600"
                : "bg-gray-400"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-white ${
                selectedCategory === category
                  ? "bg-purple-600"
                  : "bg-gray-400"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>      
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.slice(0,12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <LottieAnimation animationData={loader} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

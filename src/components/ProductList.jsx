import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Toaster } from 'sonner';
import LottieAnimation from './LottieAnimation';
import loader from "../assets/lotties/loader.json";

const ProductList = ({ product }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState(''); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [selectedCategory]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };

  const filteredProducts = products
    .filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else if (sortOrder === 'desc') {
        return b.price - a.price;
      } else {
        return 0; 
      }
    });

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(1000);
    setSortOrder(''); 
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  return (
    <div className="container mx-auto p-4 flex">
      {/* Sidebar for Filters */}
      <div className="w-1/5 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Filter Products</h2>
          <button
            className="text-red-500 underline"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <select
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2 p-2 border rounded-md"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2 p-2 border rounded-md"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Sort by Price */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sort by Price</h3>
          <select
            className="border border-gray-300 p-2 rounded-md w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option> 
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Display */}
      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <div className="flex justify-center items-center">
            <LottieAnimation animationData={loader} />
          </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductList;

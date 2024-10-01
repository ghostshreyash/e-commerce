import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const searchBarRef = useRef(null);

  const fetchSearchResults = async (query) => {
    if (query.trim()) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        const filteredResults = response.data.filter((product) =>
          product?.title?.toLowerCase()?.includes(query?.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchResults([]); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-white-800 p-4 text-black relative">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold flex-shrink-0">
          <img className="w-auto h-9" src="./assets/logo.png" alt="Logo" />
        </Link>

        <div className="w-[50%] h-full p-1 rounded-full shadow-lg bg-gray-300">
          <form
            onSubmit={handleSearch}
            ref={searchBarRef} 
            className="flex-grow mx-4 relative rounded-lg text-black"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-300 outline-none text-black"
            />
            {searchResults?.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg">
                {searchResults?.slice(0, 5).map((result) => (
                  <li
                    key={result.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => navigate(`/product/${result.id}`)}
                  >
                    {result.title}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        
        <div className="flex items-center space-x-4">
          
          <Link to="/products" className="hover:text-purple-600">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-purple-600 flex items-center">
            <div className="rounded-full w-10 h-10 p-[9px] border border-gray-600 hover:bg-zinc-100 flex items-center justify-center relative">
              <FaShoppingCart className="text-2xl" />
              {cartItems.length > 0 && (
                <span
                  className="absolute top-0 right-0 bg-purple-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                  style={{ transform: "translate(25%, -25%)" }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          <Link to="/wishlist" className="relative hover:text-purple-600 flex items-center">
            <div className="rounded-full w-10 h-10 p-[9px] border border-gray-600 hover:bg-zinc-100 flex items-center justify-center relative">
              <FaHeart className="text-2xl" />
              {wishlistItems.length > 0 && (
                <span
                  className="absolute top-0 right-0 bg-purple-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                  style={{ transform: "translate(25%, -25%)" }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </div>
          </Link>

          {isLoggedIn && (
            <div className="relative">
              <FaUserCircle
                className="text-2xl cursor-pointer"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <div className="p-4 text-black">
                    <p>{user.name}</p>
                    <Link to="/profile" className="block mt-2 text-gray-700 hover:text-gray-900">
                      Edit Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="mt-2 text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

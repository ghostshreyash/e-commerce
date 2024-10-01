import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast, Toaster } from "sonner";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast("✅ Product removed from Wishlist!", {
        position: "bottom-center",
        duration: 1000,
        style: { width: "250px" },
      });
    } else {
      addToWishlist(product);
      toast("✅ Product added to Wishlist!", {
        position: "bottom-center",
        duration: 1000,
        style: { width: "250px" },
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast("✅ Product added to cart!", {
      position: "bottom-center",
      duration: 1000,
      style: { width: "250px" },
    });
  };

  return (
    <div className="border rounded-2xl shadow-md flex flex-col transition-transform hover:-translate-y-2 bg-black text-white">
      <Link to={`/product/${product.id}`} className="flex-grow">
        {/* Upper white section with product image */}
        <div className="relative group w-full bg-white p-4 rounded-t-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain transition-transform transform group-hover:scale-105"
          />
        </div>

        {/* Product title and price */}
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-center group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-center mt-2">
            ${product.price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button & Wishlist Icon - Fixed at the bottom */}
      <div className="flex justify-between items-center mt-auto p-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors shadow-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <FaHeart
          onClick={handleWishlistToggle}
          className={`text-3xl cursor-pointer transition-colors ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          } hover:text-red-600`}
        />
      </div>
    </div>
  );
};

export default ProductCard;

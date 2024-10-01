import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; 
import { toast, Toaster } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  // Check if the product is in the wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast("✅ Product removed from Wishlist!", {
        position: "bottom-center",
        duration: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        visibleToast: 1,
        style: { width: "250px" }
      }); 
    } else {
      addToWishlist(product);
      toast('✅ Product added to Wishlist!', {
        position: "bottom-center",
        duration: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        visibleToast: 1,
        style: { width: "250px" }
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast('✅ Product added to cart!', {
      position: "bottom-center",
      duration: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      visibleToast: 1,
      style: { width: "250px" }
    });
  };

  useEffect(() => {
    // Fetch product details by ID
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container h-screen mx-auto p-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10">
      {/* Product Image */}
      <div className="h-3/4 md:w-1/2">
        <img
          src={product.image}
          alt={product.title}
          className="h-[80%] w-[70%] hover:scale-105 transition duration-300"
        />
      </div>
      
      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-lg">{product.description}</p>
        <p className="text-2xl font-semibold">Price: ${product.price}</p>
        
        {/* Add to Cart and Wishlist Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`${
              isInWishlist ? 'bg-red-500' : 'bg-gray-500'
            } text-white py-2 px-4 rounded hover:bg-gray-600 transition`}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
        <h3 className="text font-semibold">Free Delivery on Order above $150</h3>
        <Toaster />
      </div>
    </div>
  );
};

export default ProductDetails;

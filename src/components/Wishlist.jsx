import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import LottieAnimation from './LottieAnimation';
import basket from '../assets/lotties/basket.json';
import loader from "../assets/lotties/loader.json";

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-lg flex flex-col hover:-translate-y-1 cursor-pointer">
              <Link to={`/product/${product.id}`} className="flex-grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {product.title}
                </h3>
              </Link>
              <p className="text-gray-500 mb-4 text-center">${product.price}</p>

              <div className="flex justify-between items-center">
                {/* Add to Cart Button */}
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-400"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                {/* Remove from Wishlist with Trash Icon */}
                <FaTrash
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-2xl cursor-pointer text-red-600 ml-4"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full h-[82vh] flex flex-col justify-center items-center'>
          <div className='w-[150px] h-[150px] md:w-[200px] md:h-[200px] p-8 rounded-full flex items-center justify-center shadow-[rgba(0,_0,_0,_0.4)_0px_10px_30px]'>
          <LottieAnimation animationData={basket} />
          </div>

          {/* Text Content */}
          <h1 className='font-semibold text-xl md:text-3xl mt-12 mb-3 text-gray-700 px-8 text-center'>
            Your Wishlist is
            <span className='text-purple-800 ml-2'>Empty</span>
          </h1>
          <p className='text-center text-sm md:text-base px-8'>Looks like you have not made a choice yet.</p>

          {/* Button to navigate */}
          <Link to={`/`}>
            <button className='mt-8 font-semibold gap-3 px-8 py-3 rounded-lg bg-gray-800 text-white outline-none hover:bg-gray-900 duration-300'>
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

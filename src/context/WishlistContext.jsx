import React, { createContext, useContext, useState } from 'react';

// Create WishlistContext
const WishlistContext = createContext();

// Custom hook to use the WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// WishlistProvider component to wrap your app and manage wishlist state
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Function to add items to the wishlist
  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove items from the wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

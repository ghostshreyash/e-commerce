import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist'; 
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Success from './components/Success'; 
import Cancel from './components/Cancel';
import MainLayout from './components/MainLayout'; // Import MainLayout
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; 
import 'lord-icon-element';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          {isAuthenticated ? (
            <Routes>
              <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} /> 
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} /> 
                <Route path="*" element={<Navigate to="/" />} /> 
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} /> 
            </Routes>
          )}
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;

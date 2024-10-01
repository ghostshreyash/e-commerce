// src/components/Checkout.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/apiConfig';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice } = location.state || { totalPrice: 0 };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await api.post('/create-checkout-session', {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        amount: totalPrice * 100, // Amount in cents
      });
      
      const { url } = response.data;
      window.location.href = url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your address"
            required
          />
        </div>
        <div>
          <h2>Total Amount: ₹{totalPrice}</h2>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded hover:bg-purple-600 text-lg"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

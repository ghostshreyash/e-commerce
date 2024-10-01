// src/components/Success.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your payment was processed successfully.</p>
      <Link to="/" className="text-purple-600 underline">
        Return to Home
      </Link>
    </div>
  );
};

export default Success;

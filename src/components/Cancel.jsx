import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-lg mb-6">Your payment was not completed. If you want to try again, please proceed back to the cart.</p>
      <Link to="/cart" className="text-purple-600 underline">
        Return to Cart
      </Link>
    </div>
  );
};

export default Cancel;

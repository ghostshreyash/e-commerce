  import React from 'react';
  import { useCart } from '../context/CartContext';
  import { useNavigate, Link } from 'react-router-dom'; 
  import { FaTrash } from 'react-icons/fa'; 
  import { toast,Toaster } from 'sonner';
  import LottieAnimation from './LottieAnimation';
  import basket from '../assets/lotties/basket.json';
  import { loadStripe } from '@stripe/stripe-js';
import api from '../services/apiConfig';

  const stripePromise = loadStripe('pk_test_51Q4oB7CLY6CjvUHjc6Gzp1TOGRN574IleXQ5VGydKYZlCPIOvZ98KW9t8mxtn2vI4JoAW6yXHoJEJtgNObMDvuEo00PmPMBh8i');

  const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate(); 

    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const onUpdateQuantity = (id, newQuantity) => {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      if (newQuantity <= 0) {
        removeFromCart(id);
        toast("✅ Product removed to Wishlist!", {
          position: "bottom-center",
          duration: 1000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          visibleToast: 1,
          style: { width: "250px" }
          // transition: Bounce,
      });
        
      } else {
        addToCart({ ...item, quantity: newQuantity });
        toast("✅ Product added to Wishlist!", {
          position: "bottom-center",
          duration: 1000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          visibleToast: 1,
          style: { width: "250px" }
          // transition: Bounce,
      });
      }
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: basket,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    const handleProceedToCheckout = async () => {
      const totalPrice = calculateTotalPrice();
      try {
        const response = await api.post('/create-checkout-session', {
          amount: totalPrice * 100, 
        });
        const stripe = await stripePromise; 
        await stripe.redirectToCheckout({ sessionId: response.data.id });
      } catch (error) {
        console.error('Checkout error:', error);
        toast('Failed to proceed to checkout. Please try again.', { position: 'bottom-center' });
    }
    
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        {cartItems.length === 0 ? (
          <div className='w-full h-[82vh] flex flex-col justify-center items-center'>
            <div className='w-[150px] h-[150px] md:w-[200px] md:h-[200px] p-8 rounded-full flex items-center justify-center shadow-[rgba(0,_0,_0,_0.4)_0px_10px_30px]'>
            <LottieAnimation animationData={basket} />
            </div>

            <h1 className='font-semibold text-xl md:text-3xl mt-12 mb-3 text-gray-700 px-8 text-center'>
              Your Cart is
              <span className='text-purple-800 ml-2'>Empty</span>
            </h1>
            <p className='text-center text-sm md:text-base px-8'>Looks like you have not made a choice yet.</p>

            <Link to={`/`}>
              <button className='mt-8 font-semibold gap-3 px-8 py-3 rounded-lg bg-gray-800 text-white outline-none hover:bg-gray-900 duration-300'>
                Shop Now
              </button>
            </Link>
          </div>

        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start p-6 bg-white rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-lg font-medium text-purple-500 mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <FaTrash
                    onClick={() => removeFromCart(item.id)}
                    className="text-2xl cursor-pointer text-red-600 ml-4"
                  />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Total: ${calculateTotalPrice().toFixed(2)}
            </h3>
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-xl"
              onClick={handleProceedToCheckout} 
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    );
  };

  export default Cart;

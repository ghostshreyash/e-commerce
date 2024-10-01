import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";
import { useAuth } from "../context/auth";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;

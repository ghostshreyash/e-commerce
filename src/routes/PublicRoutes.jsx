import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuth } from "../context/auth";

const PublicRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      {/* If not logged in, redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;

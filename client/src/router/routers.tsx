import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/credintials/login";
import Register from "../pages/credintials/register";
import HomePage from "../pages/homePage";
import Dashboard from "@/pages/dashboard/dashboard";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/routes/protectedRoute";
import PublicRoute from "@/routes/publicRoute"; // Add this import
import ProductsNav from "@/pages/dashboard/navbar/products";
import BillingNav from "@/pages/dashboard/navbar/billing/billing";
import Profile from "@/pages/dashboard/profile";
import AddProduct from "@/pages/product/AddProduct";

function Routers() {
  const { isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - wrapped with PublicRoute */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<ProductsNav />} />
          <Route path="products/addProduct" element={<AddProduct />} />

          <Route path="billing" element={<BillingNav />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;

// src/routes/publicRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/dashboard/products" replace state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;
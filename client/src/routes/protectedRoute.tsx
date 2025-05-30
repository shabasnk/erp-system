// import { Navigate } from "react-router-dom";
// // import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "@/hooks/useAuth";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;





import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    // Store the attempted URL for redirecting after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

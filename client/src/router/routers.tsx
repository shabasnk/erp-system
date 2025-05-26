
// // src/routes/routers.tsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../pages/credintials/login";
// import Register from "../pages/credintials/register";
// import HomePage from "../pages/homePage";
// import Dashboard from "@/pages/dashboard/dashboard";
// import { useAuth } from "@/hooks/useAuth";
// import ProtectedRoute from '@/routes/protectedRoute';
// import ProductsNav from "@/pages/dashboard/navbar/products";
// function Routers() {
//   const { isLoading, isAuthenticated } = useAuth();

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Home Page (Public) */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />
//           }
//         />

//         {/* Public Routes */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
//           }
//         />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
       
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default Routers;








import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/credintials/login";
import Register from "../pages/credintials/register";
import HomePage from "../pages/homePage";
import Dashboard from "@/pages/dashboard/dashboard";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from '@/routes/protectedRoute';
import ProductsNav from "@/pages/dashboard/navbar/products";
import BillingNav from "@/pages/dashboard/navbar/billing";
import Profile from "@/pages/dashboard/profile"; // Import the Profile component

function Routers() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page (Public) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard/products" replace /> : <HomePage />
          }
        />

        {/* Public Routes */}

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard/products" replace /> : <Login />
          }
        />

        {/* <Route
  path="/login"
  element={
    isAuthenticated ? (
      <Navigate to="/dashboard/products" replace />
    ) : (
      <Login onSuccess={() => navigate("/dashboard/products", { replace: true })} />
    )
  }
/> */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard/products" replace /> : <Register />
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
          <Route path="billing" element={<BillingNav />} />
          <Route path="profile" element={<Profile />} /> {/* Add profile route */}
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
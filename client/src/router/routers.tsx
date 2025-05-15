// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "../pages/credintials/login" // ✅ Create this component
// import Register from "../pages/credintials/register";
// import HomePage from "../pages/homePage";

// function Routers() {
//   return (
//        <Routes>
//       <div className="min-h-screen flex flex-col">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register/>}/>
//         </Routes>
//       </div>
//     </Routes>
//   )
// }

// export default Routers





// src/routes/routers.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/credintials/login";
import Register from "../pages/credintials/register";
import HomePage from "../pages/homePage";
import Dashboard from "@/pages/dashboard";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from '@/routes/protectedRoute';

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
            isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;

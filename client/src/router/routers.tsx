import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/credintials/login" // ✅ Create this component
import Register from "../pages/credintials/register";
import HomePage from "../pages/homePage";

function Routers() {
  return (
       <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default Routers
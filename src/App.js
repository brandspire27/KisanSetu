import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/products" element={<Products/>}/>
</Routes>
      <footer className="bg-dark text-white text-center py-3 mt-5">
  <small>
    © {new Date().getFullYear()} KisanSetu — Empowering Farmers 🌾
  </small>
</footer>
    </BrowserRouter>
  );
}

export default App;
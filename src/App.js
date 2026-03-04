import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <footer className="bg-dark text-white text-center py-3 mt-5">
  <small>
    © {new Date().getFullYear()} KisanSetu — Empowering Farmers 🌾
  </small>
</footer>
    </Router>
  );
}

export default App;
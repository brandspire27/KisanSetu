import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Mandi from "./pages/Mandi";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
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
  <Route path="/mandi" element={<Mandi />} />
  <Route path="/weather" element={<Weather />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

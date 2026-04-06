import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaCloudSun,
  FaPhone,
  FaStore,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBox /> },
    { name: "Mandi", path: "/mandi", icon: <FaStore /> },
    { name: "Weather", path: "/weather", icon: <FaCloudSun /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
  ];

  return (
    <nav
      className="sticky-top"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(22, 163, 74, 0.9)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div className="container d-flex justify-content-between align-items-center p-3">
        
        {/* Logo */}
        <Link className="fw-bold fs-4 text-white text-decoration-none" to="/">
          🌾 Kisan Setu
        </Link>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex gap-4 align-items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-decoration-none px-3 py-2 rounded ${
                isActive(item.path)
                  ? "bg-white text-success fw-bold"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {!token ? (
            <Link to="/login" className="btn btn-light fw-bold px-4">
              Login
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-outline-light">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
  className="btn text-white fs-3 d-lg-none"
  onClick={() => setIsOpen(!isOpen)} // 🔥 toggle
>
  {isOpen ? <FaTimes /> : <FaBars />}
</button>
      </div>

        

        {/* Menu Items */}
        {isOpen && (
  <div
    className="d-lg-none position-absolute w-100"
    style={{
      top: "70px",
      left: 0,
      background: "#ffffff",
      padding: "15px",
      zIndex: 9999,
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
      borderBottomLeftRadius: "15px",
      borderBottomRightRadius: "15px",
    }}
  >
    <div className="d-flex flex-column gap-3">

      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={() => setIsOpen(false)}
          style={{
            background: isActive(item.path) ? "#16a34a" : "#f1f5f9",
            color: isActive(item.path) ? "#fff" : "#000",
            padding: "12px",
            borderRadius: "10px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {item.icon} {item.name}
        </Link>
      ))}

      {!token ? (
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="btn btn-success"
        >
          Login
        </Link>
      ) : (
        <>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="btn btn-outline-success"
          >
            Dashboard
          </Link>
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </>
      )}
    </div>
  </div>
)}

      {/* 🔥 DARK OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9998,
          }}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;

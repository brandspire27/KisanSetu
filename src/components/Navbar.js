import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaBox, FaCloudSun, FaPhone, FaStore } from "react-icons/fa";

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
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* 🔥 Sliding Mobile Menu */}
      <div
  className="position-fixed top-0 end-0 h-100 shadow p-4"
  style={{
    width: "260px",
    background: "#ffffff",          // ✅ force solid white
    opacity: 1,                     // ✅ remove transparency
    zIndex: 1050,
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "0.3s ease-in-out",
  }}
>
        {/* Close Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold">Menu</h5>
          <button className="btn fs-4" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Menu Items */}
        <div className="d-flex flex-column gap-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`d-flex align-items-center gap-2 text-decoration-none p-2 rounded ${
  isActive(item.path)
    ? "bg-success text-white"
    : "text-dark fw-semibold"
}`}
            >
              {item.icon} {item.name}
            </Link>
          ))}

          {!token ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="btn btn-success mt-3"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="btn btn-outline-success mt-3"
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

      {/* Background Overlay */}
      {isOpen && (
        <div
  onClick={() => setIsOpen(false)}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(22, 163, 74, 0.9)", // darker overlay
    backdropFilter: "none",   // 🔥 blur effect
    zIndex: 1040,
  }}
></div>
      )}
    </nav>
  );
}

export default Navbar;

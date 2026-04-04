import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(22, 163, 74, 0.9)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          🌾 Kisan Setu
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center gap-2">

            {/* Links */}
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Mandi", path: "/mandi" },
              { name: "Weather", path: "/weather" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={item.path}
                  className={`nav-link px-3 py-2 rounded ${
                    isActive(item.path)
                      ? "bg-white text-success fw-bold"
                      : "text-white"
                  }`}
                  style={{
                    transition: "0.3s",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Auth Buttons */}
            {!token ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-light fw-bold px-4"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className="btn btn-outline-light px-3"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-danger px-3"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🌾 KisanSetu
        </Link>

        <div>
          <Link className="btn btn-light me-2" to="/">
            Home
          </Link>

          {isLoggedIn && (
            <Link className="btn btn-light me-2" to="/dashboard">
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link className="btn btn-light" to="/login">
              Login
            </Link>
          ) : (
            <button
              className="btn btn-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
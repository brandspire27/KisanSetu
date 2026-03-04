import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"15px 40px",
      background:"#2E7D32",
      color:"white"
    }}>
      <h2>Kisan Setu 🌾</h2>

      <div style={{display:"flex", gap:"20px"}}>

        <Link to="/" style={{color:"white"}}>Home</Link>
        <Link to="/products" style={{color:"white"}}>Products</Link>

        {!token && (
          <>
            <Link to="/login" style={{color:"white"}}>Login</Link>
            <Link to="/signup" style={{color:"white"}}>Signup</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" style={{color:"white"}}>Dashboard</Link>
            <span
              style={{cursor:"pointer"}}
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
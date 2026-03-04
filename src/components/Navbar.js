import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(){

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return(

<nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">

<div className="container">

<Link className="navbar-brand fw-bold" to="/">
🌾 Kisan Setu
</Link>

<button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
>
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarNav">

<ul className="navbar-nav ms-auto">

<li className="nav-item">
<Link className="nav-link" to="/">Home</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/products">Products</Link>
</li>

{!token && (
<li className="nav-item">
<Link className="nav-link" to="/login">Login</Link>
</li>
)}

{token && (
<>
<li className="nav-item">
<Link className="nav-link" to="/dashboard">Dashboard</Link>
</li>

<li className="nav-item">
<span
className="nav-link"
style={{cursor:"pointer"}}
onClick={logout}
>
Logout
</span>
</li>
</>
)}

</ul>

</div>

</div>

</nav>

  )
}

export default Navbar
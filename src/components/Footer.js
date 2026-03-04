import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (

    <footer
      style={{
        background: "#1B5E20",
        color: "white",
        marginTop: "60px"
      }}
    >

      <div className="container py-5">

        <div className="row">

          {/* Branding */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">🌾 Kisan Setu</h4>
            <p className="text-light">
              Connecting farmers directly to consumers for fair prices and fresh produce.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <Link to="/" style={{color:"white", textDecoration:"none"}}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" style={{color:"white", textDecoration:"none"}}>
                  Products
                </Link>
              </li>

              <li>
                <Link to="/login" style={{color:"white", textDecoration:"none"}}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/dashboard" style={{color:"white", textDecoration:"none"}}>
                  Dashboard
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact</h5>

            <p>Email: support@kisansetu.com</p>
            <p>Phone: +91 90000 00000</p>
            <p>India 🇮🇳</p>

          </div>

        </div>

        <hr style={{borderColor:"white"}} />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} Kisan Setu — Empowering Farmers 🌾
        </p>

      </div>

    </footer>
  );
}

export default Footer;
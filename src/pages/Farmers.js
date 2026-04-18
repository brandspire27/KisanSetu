import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://kisansetu-backend-v50h.onrender.com";

  useEffect(() => {
    // Fetch registered farmers from your backend
    // Note: Update the endpoint route ('/users/farmers') if your backend uses a different path to fetch users by role
    axios
      .get(`${API}/users/farmers`) 
      .then((res) => {
        setFarmers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load farmers. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success display-5">🧑‍🌾 Our Registered Farmers</h2>
        <p className="text-muted fs-5">
          Connect directly with the hardworking farmers powering Kisan Setu.
        </p>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center shadow-sm rounded-4">
          {error}
        </div>
      ) : farmers.length === 0 ? (
        <div className="text-center text-muted fs-4 mt-5">
          No registered farmers found yet.
        </div>
      ) : (
        <div className="row g-4">
          {farmers.map((farmer, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div 
                className="card h-100 shadow-sm border-0" 
                style={{ borderRadius: "16px", transition: "transform 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="card-body text-center p-4">
                  <FaUserCircle className="text-success mb-3" size={60} />
                  <h4 className="card-title fw-bold">{farmer.name}</h4>
                  
                  {/* Assuming your backend returns email or location data */}
                  <p className="card-text text-muted mb-2">
                    <FaEnvelope className="me-2 text-success" />
                    {farmer.email || "Contact hidden"}
                  </p>
                  
                  {farmer.location && (
                    <p className="card-text text-muted mb-3">
                      <FaMapMarkerAlt className="me-2 text-success" />
                      {farmer.location}
                    </p>
                  )}
                  
                  <button className="btn btn-outline-success w-100 rounded-pill mt-2 fw-bold">
                    View Products
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Farmers;

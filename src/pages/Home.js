import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const API = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleBuy = (productId) => {
    axios.post(
      `${API}/orders`,
      { productId, quantity: 1 },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(() => alert("Order Placed Successfully"))
    .catch(err => alert(err.response?.data?.message || "Order Failed"));
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-light py-5 text-center border-bottom">
        <div className="container">
          <h1 className="display-5 fw-bold text-success">
            Connecting Farmers Directly to Consumers 🌾
          </h1>
          <p className="lead text-muted mt-3">
            Fresh produce. Fair prices. No middlemen.
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">
          🌾 Available Products
        </h2>

        <div className="row">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card shadow border-0 h-100 hover-card">

                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {product.name}
                  </h5>

                  <p className="text-muted mb-1">
                    Quantity: {product.quantity}
                  </p>

                  <h4 className="text-success mb-3">
                    ₹{product.price}
                  </h4>

                  {token && role === "consumer" && (
                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => handleBuy(product._id)}
                    >
                      Buy Now
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
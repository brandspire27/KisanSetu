import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Products() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const API = "https://kisansetu-backend-v50h.onrender.com";

  // Fetch products when the page loads
  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle the buying logic
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
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">🌾 All Products</h2>
      
      {/* Show a message if no products are loaded yet */}
      {products.length === 0 ? (
         <p className="text-center text-muted">
           Loading fresh products from farmers...
         </p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden"
                }}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">
                    {product.name}
                  </h5>

                  <p className="text-muted small mb-2">
                    Quantity: {product.quantity}
                  </p>

                  <h4 className="text-success fw-bold mb-3">
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
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

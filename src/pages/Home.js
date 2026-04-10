import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* HERO SECTION */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #2E7D32, #66BB6A)"
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">
            🌾 Kisan Setu
          </h1>
          <p className="lead mt-3">
            Connecting Farmers Directly to Consumers
          </p>
          <p className="mb-4">
            Fresh Produce • Fair Prices • No Middlemen
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/products" className="btn btn-light btn-lg">
              Browse Products
            </a>
            <a href="/login" className="btn btn-outline-light btn-lg">
              Become a Seller
            </a>
          </div>
        </div>
      </motion.div>

      {/* HOW IT WORKS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mt-5">
          <h2 className="text-center fw-bold mb-4">
            How Kisan Setu Works
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>👨‍🌾</h3>
                <h5 className="fw-bold">Farmers List Products</h5>
                <p className="text-muted">
                  Farmers upload their fresh produce directly to the platform.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>🛒</h3>
                <h5 className="fw-bold">Consumers Buy Directly</h5>
                <p className="text-muted">
                  Customers browse products and purchase directly from farmers.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>💰</h3>
                <h5 className="fw-bold">Fair Prices</h5>
                <p className="text-muted">
                  Farmers earn more while consumers get fresh produce at fair prices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* WHY FARMERS LOVE KISAN SETU */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mt-5">
          <h2 className="text-center fw-bold mb-4">
            Why Farmers Love Kisan Setu 🌾
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>💰</h3>
                <h5 className="fw-bold">Higher Profits</h5>
                <p className="text-muted">
                  Farmers sell directly to consumers without middlemen.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>🚜</h3>
                <h5 className="fw-bold">Direct Customers</h5>
                <p className="text-muted">
                  Build a loyal customer base and grow your farm business.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow h-100 p-4">
                <h3>📦</h3>
                <h5 className="fw-bold">Easy Product Listing</h5>
                <p className="text-muted">
                  Add products quickly and manage orders from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* IMPACT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mt-5 text-center">
          <h2 className="fw-bold mb-5">
            Kisan Setu Impact 📊
          </h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow p-4">
                <h1 className="text-success fw-bold">500+</h1>
                <p className="text-muted">Farmers Joined</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow p-4">
                <h1 className="text-success fw-bold">2000+</h1>
                <p className="text-muted">Consumers Connected</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow p-4">
                <h1 className="text-success fw-bold">5000+</h1>
                <p className="text-muted">Orders Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* START SELLING SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div
          className="text-center py-5 mt-5"
          style={{
            background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
            color: "white"
          }}
        >
          <h2 className="fw-bold mb-3">
            Start Selling Your Farm Products Today 🌾
          </h2>
          <p className="mb-4">
            Join Kisan Setu and connect directly with consumers.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/login" className="btn btn-light btn-lg">
              Become a Farmer
            </a>
            <a href="/products" className="btn btn-outline-light btn-lg">
              Browse Products
            </a>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

export default Home;

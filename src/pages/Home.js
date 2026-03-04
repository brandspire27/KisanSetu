import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

<motion.div
 initial={{opacity:0}}
 animate={{opacity:1}}
 transition={{duration:0.8}}
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


{/* PRODUCT SECTION */}

<div className="container mt-5">

<h2 className="text-center fw-bold mb-4">
🌾 Available Products
</h2>

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

</div>

</motion.div>

  );
}

export default Home;
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [role, setRole] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
const [incomingOrders, setIncomingOrders] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");
  const API = "http://localhost:5000";


  const fetchMyProducts = useCallback(() => {
  axios.get(`${API}/products/my-products`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setMyProducts(res.data))
  .catch(err => console.log(err));
}, [API, token]);
const fetchFarmerOrders = useCallback(() => {
  axios.get(`${API}/orders/farmer-orders`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setIncomingOrders(res.data))
  .catch(err => console.log(err));
}, [API, token]);

  const fetchMyOrders = useCallback(() => {
  axios.get(`${API}/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setMyOrders(res.data))
  .catch(err => console.log(err));
}, [API, token]);
useEffect(() => {
  if (!token) {
    navigate("/login");
  } else {
    setRole(storedRole);

    if (storedRole === "farmer") {
  fetchMyProducts();
  fetchFarmerOrders();
}

    if (storedRole === "consumer") {
      fetchMyOrders();
    }
  }
}, [token, storedRole, navigate, fetchMyProducts, fetchMyOrders, fetchFarmerOrders]);
const updateOrderStatus = (orderId, status) => {
  axios.put(
    `${API}/orders/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  .then(() => {
    alert("Order Updated");
    fetchFarmerOrders();
  })
  .catch(err => console.log(err));
};
const handleDeleteProduct = (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  axios.delete(`${API}/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => {
    alert("Product Deleted");
    fetchMyProducts();
  })
  .catch(err => console.log(err));
};

  const handleAddProduct = () => {
    axios.post(
      `${API}/products`,
      {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(() => {
      alert("Product Added Successfully 🌾");
      setProductName("");
      setProductPrice("");
      setProductQuantity("");
      setImage("");
      setShowAddProduct(false);
      fetchMyProducts();
    })
    .catch(err => alert(err.response?.data?.message || "Failed"));
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Dashboard</h2>

      {/* Farmer Dashboard */}
      {role === "farmer" && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success"
              onClick={() => setShowAddProduct(!showAddProduct)}
            >
              {showAddProduct ? "Close Form" : "+ Add Product"}
            </button>
          </div>
          <h4 className="mt-5 mb-3">Incoming Orders</h4>

{incomingOrders.map(order => (
  <div key={order._id} className="card shadow p-3 mb-3">
    <h5>{order.product?.name}</h5>
    <p>Consumer: {order.consumer?.name}</p>
    <p>Quantity: {order.quantity}</p>
    <p>Total: ₹{order.totalPrice}</p>
    <span
  className={`badge ${
    order.status === "accepted"
      ? "bg-success"
      : order.status === "rejected"
      ? "bg-danger"
      : "bg-warning text-dark"
  }`}
>
  {order.status.toUpperCase()}
</span>

    {order.status === "pending" && (
      <div>
        <button
          className="btn btn-success me-2"
          onClick={() => updateOrderStatus(order._id, "accepted")}
        >
          Accept
        </button>

        <button
          className="btn btn-danger"
          onClick={() => updateOrderStatus(order._id, "rejected")}
        >
          Reject
        </button>
      </div>
    )}
  </div>
))}

          {showAddProduct && (
            <div className="card shadow p-4 mb-4">
              <input
                className="form-control mb-2"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <input
                className="form-control mb-3"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          )}

          <h4 className="mb-3">My Products</h4>

          <div className="row">
            {myProducts.map(product => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card shadow border-0">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                 <div className="card-body">
  <h5 className="fw-bold">{product.name}</h5>
  <p className="text-success">₹{product.price}</p>
  <p>Quantity: {product.quantity}</p>

  <button
    className="btn btn-sm btn-danger"
    onClick={() => handleDeleteProduct(product._id)}
  >
    Delete
  </button>
</div>
  
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Consumer Dashboard */}
      {role === "consumer" && (
        <>
          <h4 className="mb-3">My Orders</h4>

          {myOrders.map(order => (
            <div key={order._id} className="card shadow p-3 mb-3">
              <h5>{order.product?.name}</h5>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";

function Mandi() {
  const [products, setProducts] = useState([]);

  // 🔥 Fetch products from backend
  useEffect(() => {
    fetch("https://kisansetu-backend-v50h.onrender.com")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="text-center py-5">
      
      <h1 className="fw-bold display-4">💰 Mandi</h1>

      <p className="text-muted mt-3">
        All products added by farmers
      </p>

      {/* 🔥 Show Products */}
      <div className="container mt-5">
        <div className="row">

          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card p-3 mb-3 shadow">

                  <h5>{product.name}</h5>
                  <p>👨‍🌾 Farmer: {product.owner}</p>
                  <p>💰 Price: ₹{product.price}</p>

                  <button 
                    className="btn btn-success"
                    onClick={() => buyProduct(product._id)}
                  >
                    Buy
                  </button>

                </div>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

// 🛒 Buy product
function buyProduct(id) {
  fetch("https://kisansetu-backend-v50h.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: id
    })
  })
  .then(() => alert("Order placed!"))
  .catch(err => console.log(err));
}

export default Mandi;

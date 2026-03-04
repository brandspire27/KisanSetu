import React from "react";
import { motion } from "framer-motion";

function ProductCard({name, price}) {

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
  transition={{ duration: 0.3 }}
  className="card shadow-lg border-0 h-100"
  style={{ borderRadius: "12px", overflow: "hidden",
        padding:"20px",
        width:"200px",
        cursor:"pointer"
      }}
    >
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button>Buy</button>
    </motion.div>
  );
}

export default ProductCard;
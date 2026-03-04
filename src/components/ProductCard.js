import React from "react";
import { motion } from "framer-motion";

function ProductCard({name, price}) {

  return (
    <motion.div
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      style={{
        border:"1px solid #ddd",
        borderRadius:"10px",
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
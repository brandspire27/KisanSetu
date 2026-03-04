import React from "react";
import { motion } from "framer-motion";
function Hero(){
  return(
    <motion.div
      initial={{opacity:0, y:50}}
      animate={{opacity:1, y:0}}
      transition={{duration:1}}
      style={{
        textAlign:"center",
        padding:"80px",
        background:"#E8F5E9"
      }}
    >
      <h1>Fresh Produce Direct from Farmers 🌾</h1>
      <p>Connecting farmers and consumers without middlemen.</p>

      <button style={{
        padding:"10px 20px",
        marginTop:"20px",
        background:"#2E7D32",
        color:"white",
        border:"none",
        borderRadius:"5px"
      }}>
        Explore Products
      </button>

    </motion.div>
  )
}

export default Hero
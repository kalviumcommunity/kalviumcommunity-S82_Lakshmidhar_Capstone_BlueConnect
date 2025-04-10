import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="text-blue-700 font-bold text-xl">Blue Connect</Link>
      <div className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        <Link to="/workers" className="hover:text-blue-600">Workers</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
        <Link to="/signup" className="hover:text-blue-600">Signup</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;

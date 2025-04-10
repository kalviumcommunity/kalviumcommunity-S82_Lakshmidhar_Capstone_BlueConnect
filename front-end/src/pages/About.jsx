import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-white to-blue-100 px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-700 mb-4">About Blue Connect 🌍</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Blue Connect is a platform built to bridge the gap between skilled labor workers and
          customers who are in need of reliable services. Whether you’re looking for an electrician,
          a mason, or a plumber, we’ve got you covered!
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to empower labor workers by giving them visibility and opportunity, and to
          make life easier for people needing trustworthy services in their area.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;

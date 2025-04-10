import React from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) return null; // Don't render if no data

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-xl shadow-md border border-transparent hover:border-blue-300 transition duration-300">
        <p className="text-gray-700 italic text-sm leading-relaxed mb-3">
          “{testimonial?.quote}”
        </p>
        <p className="text-sm font-semibold text-blue-700">
          — {testimonial?.name}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

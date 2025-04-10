import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/workers", { state: { selectedCategory: title } });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden border hover:border-blue-400 transition"
    >
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-blue-700 font-bold text-lg">{title}</h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;

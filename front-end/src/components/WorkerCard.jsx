import React from "react";
import { motion } from "framer-motion";
import { Hammer, PhoneCall } from "lucide-react";

const WorkerCard = ({ worker }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded p-6 border hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          <Hammer className="text-blue-500" />
          {worker.name}
        </h3>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
          {worker.skill}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">{worker.description}</p>
      <div className="flex items-center gap-2 text-blue-600 text-sm">
        <PhoneCall size={18} />
        <span>{worker.mobile}</span>
      </div>
    </motion.div>
  );
};

export default WorkerCard;

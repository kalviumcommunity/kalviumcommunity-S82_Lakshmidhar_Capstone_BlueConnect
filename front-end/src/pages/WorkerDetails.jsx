import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const WorkerDetail = ({ workers }) => {
  const { id } = useParams();
  const worker = workers.find((w) => w._id === id);

  if (!worker) return <p className="text-center mt-10">Worker not found.</p>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 px-6 py-12 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">{worker.name}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {worker.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Phone:</strong> {worker.mobile}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {worker.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WorkerDetail;

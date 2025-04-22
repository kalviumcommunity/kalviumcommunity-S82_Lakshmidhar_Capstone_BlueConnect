import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WorkersData from "../data/WorkersData"; // 💡 your worker mock data here

const categories = ["All", "Electrician", "Plumber", "Carpenter", "Mason", "Security"];

const Workers = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  useEffect(() => {
    filterWorkers();
  }, [searchTerm, activeCategory]);

  const filterWorkers = () => {
    let filtered = WorkersData;

    if (activeCategory !== "All") {
      filtered = filtered.filter(worker => worker.category === activeCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWorkers(filtered);
  };

  return (
    <motion.div
      className="min-h-screen pt-10 px-6 bg-gradient-to-br from-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
        Available Workers 👷‍♂️
      </h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap justify-center gap-3 mt-4 md:mt-0">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-400 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Worker Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {filteredWorkers.map((worker, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white rounded-lg p-5 shadow hover:shadow-xl border hover:border-blue-400 transition"
          >
            <h3 className="text-xl font-semibold text-blue-800">{worker.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{worker.email}</p>
            <p className="text-sm text-gray-600">{worker.mobile}</p>
            <p className="mt-2 text-gray-700 text-sm italic">"{worker.description}"</p>
            <span className="inline-block mt-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {worker.category}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {filteredWorkers.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No workers found 😕</p>
      )}
    </motion.div>
  );
};

export default Workers;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create Account ✨
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded px-3 py-2 shadow-sm">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2 shadow-sm">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2 shadow-sm">
            <Lock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>

          {/* New Worker Signup Button */}
          <div className="flex justify-center mt-3">
            <Link
              to="/signup/worker"
              className="text-blue-600 font-medium hover:underline"
            >
              Signup as a Worker
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;

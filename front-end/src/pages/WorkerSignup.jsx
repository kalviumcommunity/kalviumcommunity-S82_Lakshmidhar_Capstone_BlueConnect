import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, PenLine, MapPin, Briefcase, Camera } from "lucide-react";

const WorkerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
    category: "",
    location: "",
    profilePicture: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, profilePicture: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Worker submitted:", formData);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Join as a Worker 👷‍♂️
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <Phone className="text-gray-400 mr-2" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <Briefcase className="text-gray-400 mr-2" />
            <select
              name="category"
              onChange={handleChange}
              className="w-full outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Electrician">Electrician</option>
              <option value="Mason">Mason</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Security">Security</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <MapPin className="text-gray-400 mr-2" />
            <input
              type="text"
              name="location"
              placeholder="Location (City/Area)"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-start border px-3 py-2 rounded shadow-sm">
            <PenLine className="text-gray-400 mr-2 mt-1" />
            <textarea
              name="description"
              placeholder="Describe your work..."
              onChange={handleChange}
              rows={3}
              className="w-full outline-none resize-none"
              required
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <Camera className="text-gray-400 mr-2" />
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WorkerSignup;

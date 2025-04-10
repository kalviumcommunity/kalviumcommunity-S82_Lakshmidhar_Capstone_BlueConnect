import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, User } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact message:", formData);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Contact Us 📬
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded shadow-sm">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start border px-3 py-2 rounded shadow-sm">
            <MessageCircle className="text-gray-400 mr-2 mt-1" />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full outline-none resize-none"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

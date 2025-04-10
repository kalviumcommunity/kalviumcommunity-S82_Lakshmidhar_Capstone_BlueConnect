import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";

const categories = [
  { title: "Electrician", image: "/images/electrician.jpg" },
  { title: "Mason", image: "/images/mason.jpg" },
  { title: "Plumber", image: "/images/plumber.jpg" },
  { title: "Carpenter", image: "/images/carpenter.jpg" },
];

const testimonials = [
  { name: "Rahul", quote: "Excellent service and super fast response!" },
  { name: "Sneha", quote: "I found a great electrician in minutes." },
  { name: "Arjun", quote: "Easy to use and very reliable." },
];

const Home = () => {
  return (
    <motion.div
      className="pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero */}
      <motion.section
        className="text-center py-20 bg-gradient-to-br from-blue-100 to-white"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Find Trusted Labor Workers Near You 🔧
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Connect with skilled professionals for your home & commercial needs.
        </motion.p>
        <motion.a
          href="/workers"
          whileHover={{ scale: 1.1 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Explore Workers
        </motion.a>
      </motion.section>

      {/* Categories */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Categories We Serve
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <CategoryCard title={cat.title} image={cat.image} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-10">
          What Our Users Say 💬
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;

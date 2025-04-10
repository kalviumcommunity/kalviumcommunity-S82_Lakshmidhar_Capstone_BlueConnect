import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-600 text-white py-5"
    >
      <div className="container mx-auto text-center space-y-2">
        <p className="font-semibold">© 2025 BlueConnect. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-white">
          <Facebook />
          <Twitter />
          <Instagram />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WorkerConnect</h3>
            <p className="text-gray-300 mb-4">
              Connecting skilled workers with people who need their services. Find the right person for your next job.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/workers" className="text-gray-300 hover:text-white transition">Find Workers</Link></li>
              <li><Link to="/jobs" className="text-gray-300 hover:text-white transition">Browse Jobs</Link></li>
              <li><Link to="/post-job" className="text-gray-300 hover:text-white transition">Post a Job</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">For Workers</h3>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-300 hover:text-white transition">Create Profile</Link></li>
              <li><Link to="/jobs" className="text-gray-300 hover:text-white transition">Find Jobs</Link></li>
              <li><Link to="/skills" className="text-gray-300 hover:text-white transition">Showcase Skills</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition">Resources</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition">Worker Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>123 Worker Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <span>info@workerconnect.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} WorkerConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

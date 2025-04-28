import React, { useState } from 'react';
import { Menu, X, Search, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-1 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 10H8M12 14H8M8 18H16M9 6H6C5.44772 6 5 6.44772 5 7V17C5 17.5523 5.44772 18 6 18H18C18.5523 18 19 17.5523 19 17V7C19 6.44772 18.5523 6 18 6H15M9 6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772 15 6M9 6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-700">WorkerConnect</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for skills or jobs..."
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/workers" className="text-gray-700 hover:text-blue-600 font-medium">Find Workers</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">Browse Jobs</Link>
          <Link to="/post-job" className="text-gray-700 hover:text-blue-600 font-medium">Post a Job</Link>
          <Link to="/login" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <UserCircle size={20} />
            <span>Login</span>
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for skills or jobs..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link to="/workers" className="text-gray-700 hover:text-blue-600 font-medium p-2">Find Workers</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium p-2">Browse Jobs</Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 font-medium p-2">Post a Job</Link>
            <Link to="/login" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 p-2">
              <UserCircle size={20} />
              <span>Login</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

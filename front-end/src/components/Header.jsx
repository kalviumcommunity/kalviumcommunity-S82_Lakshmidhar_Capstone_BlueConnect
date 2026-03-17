import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase, Search } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Briefcase size={24} />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">Blue<span className="text-blue-600">Connect</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/workers" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition">Find Workers</Link>
          <Link to="/find-jobs" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition">Find Work</Link>
          
          {user ? (
            <div className="flex items-center space-x-6 ml-4 pl-4 border-l border-gray-100">
              <Link to="/my-jobs" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition">My Requests</Link>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black uppercase">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm font-bold text-gray-900">{user.name}</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition">Log In</Link>
              <Link to="/signup" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-50 hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-4 shadow-xl">
          <Link to="/workers" className="block text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Find Workers</Link>
          <Link to="/find-jobs" className="block text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Find Work</Link>
          {user ? (
            <>
              <Link to="/my-jobs" className="block text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>My Requests</Link>
              <button onClick={handleLogout} className="block w-full text-left text-lg font-bold text-red-500 py-2">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-lg font-bold text-gray-900" onClick={() => setIsOpen(false)}>Log In</Link>
              <Link to="/signup" className="block w-full text-center py-4 bg-blue-600 text-white font-black rounded-2xl" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

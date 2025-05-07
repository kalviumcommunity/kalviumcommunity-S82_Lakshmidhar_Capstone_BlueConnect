<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, Users, PlusCircle, ClipboardList, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // ✅ Added this

  // Retrieve user from localStorage
  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setRole(storedUser.role);
      } catch (err) {
        console.error('Failed to parse user:', err);
      }
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">Blue Connect</Link>

      <ul className="flex items-center space-x-6">
        {/* Show different links based on role */}
        {token && role === 'worker' ? (
          <>
            <li>
              <Link to="/find-jobs" className="hover:underline flex items-center gap-1">
                <Search size={18} /> Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/applied-jobs" className="hover:underline flex items-center gap-1">
                <ClipboardList size={18} /> Applied Jobs
              </Link>
            </li>
          </>
        ) : token && role === 'user' ? (
          <>
            <li>
              <Link to="/workers" className="hover:underline flex items-center gap-1">
                <Users size={18} /> Find Workers
              </Link>
            </li>
            <li>
              <Link to="/post-job" className="hover:underline flex items-center gap-1">
                <PlusCircle size={18} /> Post Job
              </Link>
            </li>
            <li>
              <Link to="/my-jobs" className="hover:underline flex items-center gap-1">
                <Briefcase size={18} /> My Jobs
              </Link>
            </li>
          </>
        ) : token && role === 'user' ? (  // Add condition for 'user' role
          <>
            <li>
              <Link to="/profile" className="hover:underline flex items-center gap-1">
                <User size={18} /> Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:underline flex items-center gap-1">
                <PlusCircle size={18} /> Settings
              </Link>
            </li>
          </>
       ) : !token && (
        <li>
          <Link to="/login" className="hover:underline">Login</Link>
        </li>
=======
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, UserCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (token && storedUser) {
        setIsLoggedIn(true);
        setRole(storedUser.role);
        setUser(storedUser);
      } else {
        setIsLoggedIn(false);
        setRole(null);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setRole(null);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
    setShowProfileCard(false);
    navigate('/');
  };

  const renderLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/login" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <UserCircle size={20} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Signup
          </Link>
        </>
      );
    }

    return (
      <>
        {role === 'user' && (
          <>
            <Link to="/workers" className="text-gray-700 hover:text-blue-600 font-medium">Find Workers</Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 font-medium">Post a Job</Link>
          </>
        )}

        {role === 'worker' && (
          <>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">Browse Jobs</Link>
          </>
        )}

        <div className="relative">
          <button
            onClick={() => setShowProfileCard(prev => !prev)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <UserCircle size={20} />
            <span>Profile</span>
          </button>
          {showProfileCard && user && (
            <div className="absolute top-10 right-0 bg-white border shadow-lg rounded-md w-64 p-4 z-20">
              <h3 className="font-semibold text-blue-600 mb-2">User Details</h3>
              <p className="text-sm text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-700"><strong>Role:</strong> {user.role}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-red-500 hover:text-red-700 font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-1 rounded">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10H8M12 14H8M8 18H16M9 6H6C5.45 6 5 6.45 5 7V17C5 17.55 5.45 18 6 18H18C18.55 18 19 17.55 19 17V7C19 6.45 18.55 6 18 6H15M9 6C9 5.45 9.45 5 10 5H14C14.55 5 15 5.45 15 6M9 6C9 6.55 9.45 7 10 7H14C14.55 7 15 6.55 15 6" />
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-700">WorkerConnect</span>
        </Link>

        {isLoggedIn && (
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
        )}

        <nav className="hidden md:flex items-center space-x-6">
          {renderLinks()}
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          {isLoggedIn && (
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
          )}
          <nav className="flex flex-col space-y-4">
            {renderLinks()}
          </nav>
        </div>
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
      )}

        {/* Profile + Logout (only if logged in) */}
        {token && (
          <li className="relative">
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer flex items-center gap-2"
            >
              <User size={20} />
              <span className="text-sm font-medium">Profile</span>
            </div>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

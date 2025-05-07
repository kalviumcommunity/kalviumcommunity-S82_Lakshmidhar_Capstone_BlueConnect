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

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Blue Connect
      </Link>

      <nav className="flex items-center space-x-6">
        {user ? (
          <>
            {user.role === 'worker' ? (
              <>
                <Link to="/worker-form" className="text-gray-700 hover:text-blue-600 font-medium">
                  Worker Form
                </Link>
                <Link to="/my-jobs" className="text-gray-700 hover:text-blue-600 font-medium">
                  My Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/workers" className="text-gray-700 hover:text-blue-600 font-medium">
                  Find Workers
                </Link>
                <Link to="/post-job" className="text-gray-700 hover:text-blue-600 font-medium">
                  Post Job
                </Link>
              </>
            )}

            {/* Profile Dropdown */}
            <Menu>
              <MenuButton className="text-gray-700 font-medium hover:text-blue-600 flex items-center">
                {user.email.split('@')[0]} <ChevronDownIcon className="ml-1" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/my-jobs')}>My Jobs</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

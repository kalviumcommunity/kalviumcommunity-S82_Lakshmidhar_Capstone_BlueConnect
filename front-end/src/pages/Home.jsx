import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WorkerCard from '../components/WorkerCard';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [featuredWorkers, setFeaturedWorkers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch featured workers
    axios.get('http://localhost:3516/api/worker-profile')
      .then(res => setFeaturedWorkers(res.data))
      .catch(err => console.error('Error loading featured workers', err));
  }, []);

  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Skilled Blue Collar Workers For Your Next Project
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with reliable professionals for plumbing, electrical work, carpentry, and more.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/signup" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
                    Join Now
                  </Link>
                  <Link to="/workers" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition">
                    Browse Workers
                  </Link>
                </>
              ) : role === 'employer' ? (
                <>
                  <Link to="/post-job" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
                    Post a Job
                  </Link>
                  <Link to="/my-jobs" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition">
                    My Posted Jobs
                  </Link>
                </>
              ) : role === 'worker' ? (
                <>
                  <Link to="/jobs" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
                    Find Jobs
                  </Link>
                  <Link to="/applied-jobs" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition">
                    My Applications
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
                    View Profile
                  </Link>
                  <Link to="/settings" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition">
                    Settings
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* Featured Workers Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Workers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkers.map(worker => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

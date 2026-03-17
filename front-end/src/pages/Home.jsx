import React, { useState, useEffect } from 'react';
import { workerService, jobService } from '../services/api';
import WorkerCard from '../components/WorkerCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [featuredWorkers, setFeaturedWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const { data } = await workerService.getWorkers({ profession: '', location: '' });
        setFeaturedWorkers(data.slice(0, 4)); // Show first 4 workers
      } catch (err) {
        console.error('Error loading data', err);
        setError('Failed to load featured workers.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <div className="bg-white">
      {/* Hero Section - Premium Glassmorphism Design */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#93c5fd] to-[#2563eb] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            The Ultimate Workforce Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Connect with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect Worker</span> for Any Task
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
            BlueConnect bridges the gap between skilled professionals and people who need their expertise. Real-time tracking, secure payments, and verified reviews.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200">
                  Join the Marketplace
                </Link>
                <Link to="/workers" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-xl hover:border-blue-100 hover:bg-blue-50/50 transform hover:-translate-y-1 transition duration-200">
                  Browse Professionals
                </Link>
              </>
            ) : (
              <>
                {role === 'user' ? (
                  <Link to="/post-job" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200">
                    Post a Service Request
                  </Link>
                ) : (
                  <Link to="/find-jobs" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200">
                    Find Available Work
                  </Link>
                )}
                <Link to="/workers" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-xl hover:border-blue-100 hover:bg-blue-50/50 transform hover:-translate-y-1 transition duration-200">
                  Explore Talent
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-1">500+</div>
              <div className="text-gray-500 font-medium">Verified Workers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-1">10k+</div>
              <div className="text-gray-500 font-medium">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-1">4.9/5</div>
              <div className="text-gray-500 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-1">24/7</div>
              <div className="text-gray-500 font-medium">Service Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Top-Rated Professionals</h2>
              <p className="mt-2 text-lg text-gray-500">Highly skilled and verified experts for your needs.</p>
            </div>
            <Link to="/workers" className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-700">
              View All <span className="ml-2">→</span>
            </Link>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
             </div>
          ) : error ? (
            <p className="text-center text-red-500 bg-red-50 py-10 rounded-xl">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { jobService } from '../services/api';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { Plus, LayoutGrid, AlertCircle } from 'lucide-react';

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await jobService.getMyRequests();
        setMyJobs(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load your jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Retrieving your requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Service Requests</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage and track your posted jobs in one place.</p>
          </div>
          <Link 
            to="/post-job" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
          >
            <Plus size={20} className="mr-2" />
            New Request
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-12 rounded-2xl">
            <div className="flex items-center">
              <AlertCircle className="text-red-400 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {myJobs.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-20 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mb-8 shadow-inner">
              <LayoutGrid size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">You haven't posted any jobs yet</h3>
            <p className="text-gray-500 text-lg mb-10">
              Post your first service request to connect with skilled workers in your area.
            </p>
            <Link 
              to="/post-job" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;

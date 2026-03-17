import React, { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';
import { Briefcase, Info, AlertCircle } from 'lucide-react';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await jobService.getJobs();
      setJobs(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load available jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Available Jobs</h1>
            <p className="text-gray-500 mt-2 text-lg">Browse and apply for verify service requests in your area.</p>
          </div>
        </div>

        <SearchFilters onSearch={() => {}} type="jobs" />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-12 rounded-2xl">
            <div className="flex items-center">
              <AlertCircle className="text-red-400 mr-3" size={24} />
              <p className="text-red-700 font-bold">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center py-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium font-bold uppercase tracking-widest text-xs">Finding opportunities...</p>
          </div>
        ) : (
          <>
            {jobs.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-20 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mb-8 shadow-inner">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">No jobs available right now</h3>
                <p className="text-gray-500 text-lg">
                  Check back later or try adjusting your search filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobsList;

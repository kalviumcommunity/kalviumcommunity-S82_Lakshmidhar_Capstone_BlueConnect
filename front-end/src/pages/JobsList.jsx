import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3516/api/jobs')
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (filters) => {
    setLoading(true);

    setTimeout(() => {
      let results = [...jobs];

      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        results = results.filter(job =>
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword)
        );
      }

      if (filters.location) {
        const location = filters.location.toLowerCase();
        results = results.filter(job =>
          job.location.toLowerCase().includes(location)
        );
      }

      if (filters.category) {
        results = results.filter(job => job.category === filters.category);
      }

      if (filters.minBudget !== undefined) {
        results = results.filter(job => job.budget >= filters.minBudget);
      }

      if (filters.maxBudget !== undefined) {
        results = results.filter(job => job.budget <= filters.maxBudget);
      }

      setFilteredJobs(results);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Available Jobs</h1>
      <SearchFilters onSearch={handleSearch} type="jobs" />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600">Adjust your filters and try again.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsList;

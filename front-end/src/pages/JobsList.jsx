import React, { useState } from 'react';
import jobs from '../data/jobs';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';


const JobsList = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = (filters) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...jobs];
      
      // Filter by keyword (title or description)
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        results = results.filter(job => 
          job.title.toLowerCase().includes(keyword) || 
          job.description.toLowerCase().includes(keyword)
        );
      }
      
      // Filter by location
      if (filters.location) {
        const location = filters.location.toLowerCase();
        results = results.filter(job => 
          job.location.toLowerCase().includes(location)
        );
      }
      
      // Filter by category
      if (filters.category) {
        results = results.filter(job => job.category === filters.category);
      }
      
      // Filter by budget range
      if (filters.minBudget !== undefined) {
        results = results.filter(job => job.budget >= filters.minBudget);
      }
      
      if (filters.maxBudget !== undefined) {
        results = results.filter(job => job.budget <= filters.maxBudget);
      }
      
      setFilteredJobs(results);
      setLoading(false);
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Available Jobs</h1>
      
      <SearchFilters onSearch={handleSearch} type="jobs" />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters to find jobs that match your criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsList;

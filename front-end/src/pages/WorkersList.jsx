import React, { useState } from 'react';
import workers from '../data/WorkersData';
import WorkerCard from '../components/WorkerCard';
import SearchFilters from '../components/SearchFilters';

const WorkersList = () => {
  const [filteredWorkers, setFilteredWorkers] = useState(workers);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = (filters) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...workers];
      
      // Filter by keyword (name or skills)
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        results = results.filter(worker => 
          worker.name.toLowerCase().includes(keyword) || 
          worker.skills.some(skill => skill.toLowerCase().includes(keyword)) ||
          worker.about.toLowerCase().includes(keyword)
        );
      }
      
      // Filter by location
      if (filters.location) {
        const location = filters.location.toLowerCase();
        results = results.filter(worker => 
          worker.location.toLowerCase().includes(location)
        );
      }
      
      // Filter by skills
      if (filters.skills && filters.skills.length > 0) {
        results = results.filter(worker => 
          filters.skills.some((skill) => worker.skills.includes(skill))
        );
      }
      
      // Filter by rate range
      if (filters.minRate !== undefined) {
        results = results.filter(worker => worker.hourlyRate >= filters.minRate);
      }
      
      if (filters.maxRate !== undefined) {
        results = results.filter(worker => worker.hourlyRate <= filters.maxRate);
      }
      
      // Filter by rating
      if (filters.minRating !== undefined) {
        results = results.filter(worker => worker.rating >= filters.minRating);
      }
      
      setFilteredWorkers(results);
      setLoading(false);
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Skilled Workers</h1>
      
      <SearchFilters onSearch={handleSearch} type="workers" />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {filteredWorkers.length} {filteredWorkers.length === 1 ? 'worker' : 'workers'}
          </div>
          
          {filteredWorkers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map(worker => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No workers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters to find workers that match your needs.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkersList;

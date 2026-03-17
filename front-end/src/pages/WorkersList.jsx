import React, { useState, useEffect } from 'react';
import { workerService } from '../services/api';
import WorkerCard from '../components/WorkerCard';
import SearchFilters from '../components/SearchFilters';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      // Map frontend filters to backend params
      const params = {
        profession: filters.keyword || filters.skills?.join(','),
        location: filters.location,
      };
      const { data } = await workerService.getWorkers(params);
      setWorkers(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch workers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch({});
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Skilled Workers
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover reliable professionals in your area for any task.
          </p>
        </div>
      </div>

      <SearchFilters onSearch={handleSearch} type="workers" />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Searching for the best workers...</p>
        </div>
      ) : (
        <>
          {workers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No workers found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search filters or location to find more professionals.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {workers.map(worker => (
                <div key={worker.id} className="transform hover:scale-[1.02] transition-transform duration-200">
                  <WorkerCard worker={worker} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkersList;

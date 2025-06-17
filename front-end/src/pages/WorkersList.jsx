import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkerCard from '../components/WorkerCard';
import SearchFilters from '../components/SearchFilters';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://capstone-backend-65es.onrender.com/api/worker-profile', { params: filters });
      setFilteredWorkers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch({});
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Skilled Workers</h1>

      <SearchFilters onSearch={handleSearch} type="workers" />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map(worker => (
            <WorkerCard key={worker._id} worker={worker} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkersList;

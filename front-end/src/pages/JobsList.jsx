<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
import axios from 'axios';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
<<<<<<< HEAD
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
=======
  const [loading, setLoading] = useState(false);

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3516/api/jobs');
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (filters) => {
    let results = [...jobs];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      results = results.filter((job) =>
        job.location.toLowerCase().includes(loc)
      );
    }

    // example category and budget filters if your API/model support them
    if (filters.category) {
      results = results.filter((job) => job.category === filters.category);
    }
    if (filters.minBudget != null) {
      results = results.filter((job) => job.salary >= filters.minBudget);
    }
    if (filters.maxBudget != null) {
      results = results.filter((job) => job.salary <= filters.maxBudget);
    }

    setFilteredJobs(results);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Available Jobs</h1>

      <SearchFilters onSearch={handleSearch} type="jobs" />

      <div className="mb-4 text-gray-600">
        Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search filters to find jobs that match your criteria.
          </p>
        </div>
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
      )}
    </div>
  );
};

export default JobsList;

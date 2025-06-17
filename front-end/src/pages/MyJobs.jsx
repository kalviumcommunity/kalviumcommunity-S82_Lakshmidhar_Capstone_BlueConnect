import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Get the user ID from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Fetch the jobs posted by the current user (using user._id from localStorage)
  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        setMessage('You need to be logged in to view your jobs.');
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch jobs from the backend using the current user's ID (from the token)
        const res = await axios.get('https://capstone-backend-65es.onrender.com/api/jobs/my-jobs', config);
        setMyJobs(res.data || []);
      } catch (error) {
        setMessage('Failed to load jobs. Please try again later.');
      }

      setLoading(false);
    };

    fetchJobs();
  }, [token]);

  // Delete a job
  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`https://capstone-backend-65es.onrender.com/api/jobs/${jobId}`, config);
        setMyJobs(myJobs.filter((job) => job._id !== jobId));
        setMessage('Job deleted successfully.');
      } catch (error) {
        setMessage('Failed to delete the job. Please try again later.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Posted Jobs</h1>

      {loading ? (
        <p>Loading your posted jobs...</p>
      ) : message ? (
        <p className="text-red-600">{message}</p>
      ) : myJobs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myJobs.map((job) => (
            <div key={job._id} className="relative">
              <JobCard job={job} />
              <div className="absolute top-0 right-0 p-4">
                <Link to={`/jobs/edit/${job._id}`} className="mr-2 text-blue-600 hover:text-blue-800">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyJobs;

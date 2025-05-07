import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:3516/api/jobs/applied/${userId}`);
        setAppliedJobs(res.data.jobs);
      } catch (err) {
        console.error('Error fetching applied jobs', err);
      }
    };
    if (userId) fetchAppliedJobs();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Jobs You've Applied To</h1>
      {appliedJobs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appliedJobs.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default AppliedJobs;

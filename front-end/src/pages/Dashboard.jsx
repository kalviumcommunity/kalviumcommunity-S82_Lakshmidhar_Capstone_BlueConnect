import React, { useEffect, useState } from 'react';
import { User, Briefcase, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const response = await axios.get('https://capstone-backend-65es.onrender.com/api/auth/me');
        setUser(response.data);
      } catch (error) {
        toast.error('Authentication failed');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p className="text-center mt-12">Loading Dashboard...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || 'User'}!
        </h1>
        <div className="flex items-center space-x-4">
          <User className="text-blue-600" />
          <span className="text-gray-700 font-medium capitalize">{user?.role}</span>
        </div>
      </div>

      {user.role === 'worker' ? (
        <div className="space-y-8">
          {/* Worker Form */}
          <section className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="text-blue-500" /> Update Your Skills
            </h2>
            {/* You can reuse your WorkerForm component here */}
            <p>Worker form goes here (skills, experience, etc.)</p>
          </section>

          {/* Posted Jobs */}
          <section className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-blue-500" /> Your Posted Jobs
            </h2>
            {/* Show list of posted jobs */}
            <p>List of jobs posted by this worker goes here</p>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          {/* All Workers */}
          <section className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="text-blue-500" /> Available Workers
            </h2>
            {/* Reuse your Workers list component */}
            <p>List of all available workers with filters</p>
          </section>

          {/* Post a Job */}
          <section className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="text-blue-500" /> Post a Job
            </h2>
            {/* Show job posting form */}
            <p>Job posting form for employers goes here</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

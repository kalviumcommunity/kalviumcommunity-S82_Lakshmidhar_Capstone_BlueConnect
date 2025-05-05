import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    budget: '',
    deadline: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3516/api/jobs', formData);
      toast.success('Job created successfully!');
      navigate('/jobs'); // redirect to job list
    } catch (err) {
      console.error(err);
      toast.error('Failed to create job');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {['title', 'description', 'location', 'category', 'budget', 'deadline'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            {field === 'description' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
              />
            ) : (
              <input
                type={field === 'budget' ? 'number' : field === 'deadline' ? 'date' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;

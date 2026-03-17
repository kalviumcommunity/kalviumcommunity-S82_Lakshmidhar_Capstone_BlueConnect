import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import { Briefcase, MapPin, AlignLeft, DollarSign, Send, CheckCircle } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    requirements: '',
    budget: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await jobService.createJob({
        ...formData,
        budget: parseFloat(formData.budget) || 0,
      });
      setSuccess(true);
      setTimeout(() => navigate('/my-jobs'), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Job Posted Successfully!</h2>
        <p className="text-gray-500 text-lg">Your request is now live. Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Post a Job Request</h1>
              <p className="text-gray-500 text-lg">Describe what you need, and the best professionals will find you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    <Briefcase size={16} className="mr-2 text-blue-600" />
                    Job Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Plumber Needed for Renovations"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition duration-200 font-medium text-gray-900"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      <MapPin size={16} className="mr-2 text-blue-600" />
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Downtown Los Angeles"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition duration-200 font-medium text-gray-900"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      <DollarSign size={16} className="mr-2 text-blue-600" />
                      Estimate Budget ($)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 250"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition duration-200 font-medium text-gray-900"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    <AlignLeft size={16} className="mr-2 text-blue-600" />
                    Detailed Description
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe the task and expectations..."
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition duration-200 font-medium text-gray-900 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    <CheckCircle size={16} className="mr-2 text-blue-600" />
                    Special Requirements
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Must bring own tools, weekend availability"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition duration-200 font-medium text-gray-900"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                ) : (
                  <Send size={20} className="mr-3" />
                )}
                Post Job Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;

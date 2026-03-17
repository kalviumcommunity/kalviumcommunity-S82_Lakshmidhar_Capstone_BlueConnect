import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workerService } from '../services/api';
import { Briefcase, MapPin, AlignLeft, Phone, User, Send, CheckCircle } from 'lucide-react';

const WorkerProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profession: '',
    location: '',
    experience_years: '',
    bio: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await workerService.updateProfile({
        ...formData,
        experience_years: parseInt(formData.experience_years) || 0,
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile. Please try again.');
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
        <h2 className="text-3xl font-black text-gray-900 mb-2">Profile Updated!</h2>
        <p className="text-gray-500 text-lg">Your professional profile is now visible. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 mb-6 shadow-inner">
                <Briefcase size={32} />
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Complete Your Profile</h1>
              <p className="text-gray-500 text-lg">Tell us about your skills and experience to find the best work.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Primary Profession</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Electrician"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Years of Experience</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="number"
                      required
                      placeholder="e.g. 5"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Primary Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. San Francisco, CA"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Contact Email/Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Professional Bio</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-6 text-gray-300" size={20} />
                  <textarea
                    required
                    rows="6"
                    placeholder="Describe your background, skills, and previous projects..."
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900 resize-none"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transform hover:-translate-y-1 transition flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                ) : (
                  <Send size={20} className="mr-3" />
                )}
                Save Professional Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileForm;

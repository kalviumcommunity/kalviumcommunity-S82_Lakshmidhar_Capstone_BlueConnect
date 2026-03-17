import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { UserPlus, Mail, Lock, User, Briefcase, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Defaults to 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.signup(formData);
      localStorage.setItem('token', data.access_token);
      
      // Fetch user details to store in localStorage
      const userRes = await authService.getMe();
      localStorage.setItem('user', JSON.stringify(userRes.data));
      
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Signup failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 mb-6">
            <UserPlus size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-gray-500 font-medium">Join the marketplace and start connecting</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl flex items-center">
                <AlertCircle className="text-red-400 mr-3" size={20} />
                <p className="text-red-700 text-sm font-bold">{error}</p>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition font-medium text-gray-900"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition font-medium text-gray-900"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition font-medium text-gray-900"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block text-center">I want to...</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`py-4 rounded-2xl border-2 font-bold transition flex flex-col items-center gap-2 ${
                      formData.role === 'user' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'user' })}
                  >
                    <Search size={24} />
                    Hire Talent
                  </button>
                  <button
                    type="button"
                    className={`py-4 rounded-2xl border-2 font-bold transition flex flex-col items-center gap-2 ${
                      formData.role === 'worker' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'worker' })}
                  >
                    <Briefcase size={24} />
                    Work as Pro
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transform hover:-translate-y-1 transition flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
              ) : (
                <CheckCircle2 size={20} className="mr-3" />
              )}
              Create Account
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-700 underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

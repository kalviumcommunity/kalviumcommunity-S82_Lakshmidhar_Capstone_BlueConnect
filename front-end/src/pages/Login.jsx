import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.login(new URLSearchParams(formData));
      localStorage.setItem('token', data.access_token);
      
      // Fetch user details to store in localStorage
      const userRes = await authService.getMe();
      localStorage.setItem('user', JSON.stringify(userRes.data));
      
      navigate('/');
      window.location.reload(); // Refresh to update header
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-blue-600 text-white shadow-xl shadow-blue-100 mb-6">
            <LogIn size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-500 font-medium">Log in to manage your connections</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl flex items-center">
                <AlertCircle className="text-red-400 mr-3" size={20} />
                <p className="text-red-700 text-sm font-bold">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
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
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition font-medium text-gray-900"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
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
                <ArrowRight size={20} className="mr-3" />
              )}
              Log In
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-black hover:text-blue-700 underline underline-offset-4">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const WorkerProfileForm = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    skills: '',
    experience: '',
    company: '',
    hourlyRate: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3516/api/worker-profile/status', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.exists) {
          const profileData = await axios.get('http://localhost:3516/api/worker-profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(profileData.data);
          setForm({
            skills: profileData.data.skills.join(', '),
            experience: profileData.data.experience,
            company: profileData.data.company || '',
            hourlyRate: profileData.data.hourlyRate
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err.message);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(skill => skill.trim())
      };

      const url = 'http://localhost:3516/api/worker-profile';
      const method = profile ? 'put' : 'post';

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
      setProfile(payload);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold">
        {profile ? 'Edit Your Profile' : 'Create Your Profile'}
      </h2>

      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        placeholder="Skills (comma separated)"
      />
      <input
        name="experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        placeholder="Experience"
      />
      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        placeholder="Company (optional)"
      />
      <input
        name="hourlyRate"
        type="number"
        value={form.hourlyRate}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        placeholder="Hourly Rate"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default WorkerProfileForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const WorkerProfileForm = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    skills: '',
    experience: '',
    company: '',
    hourlyRate: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3516/api/worker-profile/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProfile(res.data);
      setForm({
        skills: res.data.skills,
        experience: res.data.experience,
        company: res.data.company,
        hourlyRate: res.data.hourlyRate
      });
    }).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/worker-profile', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(profile ? 'Profile updated' : 'Profile created');
    } catch (err) {
      console.error(err);
      toast.error('Error saving profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {profile ? 'Edit Your Profile' : 'Create Your Profile'}
      </h2>

      <input name="skills" value={form.skills} onChange={handleChange} className="input mb-3" placeholder="Skills" />
      <input name="experience" value={form.experience} onChange={handleChange} className="input mb-3" placeholder="Experience" />
      <input name="company" value={form.company} onChange={handleChange} className="input mb-3" placeholder="Company" />
      <input name="hourlyRate" type="number" value={form.hourlyRate} onChange={handleChange} className="input mb-3" placeholder="Hourly Rate" />

      <button type="submit" className="btn btn-blue w-full">
        {profile ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default WorkerProfileForm;

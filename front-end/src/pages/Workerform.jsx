import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WorkerProfileForm = () => {
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    about: '',
    location: '',
    hourlyRate: '',
    availability: [],
    experience: '',
    avatar: '',
    skills: [],
    skillInput: ''
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3516/work/profile/${userId}`)
        .then(res => {
          const data = res.data;
          setFormData(prev => ({
            ...prev,
            about: data.about || '',
            location: data.location || '',
            hourlyRate: data.hourlyRate || '',
            availability: data.availability || [],
            experience: data.experience || '',
            avatar: data.avatar || '',
            skills: data.skills || [],
            skillInput: ''
          }));
        })
        .catch(err => {
          console.error('Failed to fetch profile:', err);
          alert('Could not load worker profile.');
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleAddSkill = () => {
    const trimmed = formData.skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed],
        skillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (userId) {
        // Update profile
        response = await axios.put(`http://localhost:3516/work/profile/${userId}`, formData);
      } else {
        // Create profile (provide your logic for actual userId)
        const newUserId = 'replace-with-actual-userId'; // Example placeholder
        response = await axios.post(`http://localhost:3516/work/profile`, {
          ...formData,
          userId: newUserId
        });
      }

      alert('Profile saved successfully!');
      console.log('Server response:', response.data);
    } catch (error) {
      alert('Failed to save profile.');
      console.error('Axios error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{userId ? 'Edit' : 'Create'} Worker Profile</h2>

      {/* About */}
      <div className="mb-4">
        <label className="block font-medium mb-1">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="City, Country"
        />
      </div>

      {/* Hourly Rate */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Hourly Rate ($/hr)</label>
        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Experience (Years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Avatar */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Avatar URL</label>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Availability</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <label
              key={day}
              className={`cursor-pointer px-3 py-1 rounded-full border ${
                formData.availability.includes(day)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={formData.availability.includes(day)}
                onChange={() => handleAvailabilityToggle(day)}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Skills</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="skillInput"
            value={formData.skillInput}
            onChange={handleChange}
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Plumbing"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-lg"
      >
        Save Profile
      </button>
    </form>
  );
};

export default WorkerProfileForm;

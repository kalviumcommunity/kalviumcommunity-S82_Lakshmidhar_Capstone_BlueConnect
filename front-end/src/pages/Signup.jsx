import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const blueCollarSkills = [
  { value: 'Plumber', label: 'Plumber' },
  { value: 'Electrician', label: 'Electrician' },
  { value: 'Carpenter', label: 'Carpenter' },
  { value: 'Mason', label: 'Mason' },
  { value: 'Painter', label: 'Painter' },
  { value: 'Welder', label: 'Welder' },
  { value: 'Driver', label: 'Driver' },
  { value: 'Gardener', label: 'Gardener' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Security Guard', label: 'Security Guard' },
  { value: 'Housekeeper', label: 'Housekeeper' },
  { value: 'Construction Worker', label: 'Construction Worker' },
  { value: 'Laborer', label: 'Laborer' },
  { value: 'HVAC Technician', label: 'HVAC Technician' },
  { value: 'Mechanic', label: 'Mechanic' },
  { value: 'Beautician', label: 'Beautician' },
  { value: 'Tailor', label: 'Tailor' }
];

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [extraFields, setExtraFields] = useState({ company: '', skills: [] });

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setExtraFields(selectedRole === 'worker' ? { skills: [] } : { company: '' });
  };

  const handleSkillChange = (selectedOptions) => {
    setExtraFields((prev) => ({ ...prev, skills: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3516/api/auth/signup', {
        name,
        email,
        password,
        role,
        extraFields,
      });
  
      const { token, user } = res.data;
  
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      toast.success('Registration successful!');
      navigate(user.role === 'worker' ? '/' : '/');
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed! Please try again.';
      toast.error(message);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-3 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Role</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="user"
                checked={role === 'user'}
                onChange={handleRoleChange}
                className="form-radio"
              />
              <span className="ml-2">User (Employer)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="worker"
                checked={role === 'worker'}
                onChange={handleRoleChange}
                className="form-radio"
              />
              <span className="ml-2">Worker</span>
            </label>
          </div>
        </div>

        {role === 'worker' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <Select
              isMulti
              name="skills"
              options={blueCollarSkills}
              value={extraFields.skills}
              onChange={handleSkillChange}
              placeholder="Select your skills"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        )}

        {role === 'user' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name"
              className="w-full px-3 py-2 border rounded-md"
              value={extraFields.company}
              onChange={(e) => setExtraFields({ ...extraFields, company: e.target.value })}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const JobPostForm = () => {
  const { jobId } = useParams();
  const isEditing = !!jobId;

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-Time',
    description: '',
    requirements: '',
    contactEmail: '',
    category: '',
    budget: '',
    deadline: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [aiUsed, setAiUsed] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchJob = async () => {
      if (isEditing) {
        try {
          const res = await axios.get(`https://capstone-backend-65es.onrender.com/api/jobs/${jobId}`, config);
          const job = res.data;
          setFormData({
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            salary: job.salary || '',
            jobType: job.jobType || 'Full-Time',
            description: job.description || '',
            requirements: job.requirements || '',
            contactEmail: job.contactEmail || '',
            category: job.category || '',
            budget: job.budget || '',
            deadline: job.deadline?.split('T')[0] || '',
          });
        } catch (error) {
          setMessage('Failed to load job data for editing');
        }
      }
    };

    fetchJob();
  }, [isEditing, jobId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isEditing) {
        await axios.put(`https://capstone-backend-65es.onrender.com/api/jobs/${jobId}`, formData, config);
        setMessage('Job updated successfully!');
      } else {
        await axios.post('https://capstone-backend-65es.onrender.com/api/jobs', formData, config);
        setMessage('Job posted successfully!');
        setFormData({
          title: '',
          company: '',
          location: '',
          salary: '',
          jobType: 'Full-Time',
          description: '',
          requirements: '',
          contactEmail: '',
          category: '',
          budget: '',
          deadline: '',
        });
        setAiUsed(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }

    setLoading(false);
  };

  const handleAIAutofill = async () => {
    if (!formData.title || !formData.category) {
      setMessage('Title and Category are required for AI suggestions');
      return;
    }

    setAiLoading(true);
    setMessage('');
    try {
      const descPrompt = `You are a professional recruiter. Write a detailed and engaging job description for the position of "${formData.title}" in the "${formData.category}" category.`;
      const reqPrompt = `Provide a clear, bullet-point list of requirements for the job title "${formData.title}" under the "${formData.category}" category.`;

      const [descRes, reqRes] = await Promise.all([
        axios.post('http://localhost:3516/api/google/autocomplete', { prompt: descPrompt }),
        axios.post('http://localhost:3516/api/google/autocomplete', { prompt: reqPrompt }),
      ]);

      setFormData((prev) => ({
        ...prev,
        description: descRes.data.suggestion.trim(),
        requirements: reqRes.data.suggestion.trim(),
      }));

      setAiUsed(true);
      setMessage('AI autofill completed successfully!');
    } catch (err) {
      setMessage('AI suggestion failed. Please try again.');
    }
    setAiLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">{isEditing ? 'Update Job' : 'Post a New Job'}</h2>

      <input name="title" placeholder="Job Title" required onChange={handleChange} value={formData.title} className="w-full p-2 border rounded" />
      <input name="company" placeholder="Company" onChange={handleChange} value={formData.company} className="w-full p-2 border rounded" />
      <input name="location" placeholder="Location" required onChange={handleChange} value={formData.location} className="w-full p-2 border rounded" />
      <input name="salary" placeholder="Salary" onChange={handleChange} value={formData.salary} className="w-full p-2 border rounded" />

      <select name="jobType" required onChange={handleChange} value={formData.jobType} className="w-full p-2 border rounded">
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Internship</option>
        <option>Freelance</option>
      </select>

      <textarea name="description" placeholder="Job Description" required onChange={handleChange} value={formData.description} className="w-full p-2 border rounded" />
      <textarea name="requirements" placeholder="Requirements" onChange={handleChange} value={formData.requirements} className="w-full p-2 border rounded" />

      {!aiUsed && (
        <button
          type="button"
          onClick={handleAIAutofill}
          disabled={aiLoading || !formData.title || !formData.category}
          className={`w-full p-2 rounded ${aiLoading ? 'bg-gray-400 text-white' : 'bg-green-600 text-white'}`}
        >
          {aiLoading ? 'Generating with AI...' : 'Autofill with AI'}
        </button>
      )}

      {aiUsed && <p className="text-green-600 text-center text-sm">✔ AI autofill completed</p>}

      <input name="contactEmail" placeholder="Contact Email" onChange={handleChange} value={formData.contactEmail} className="w-full p-2 border rounded" />
      <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} className="w-full p-2 border rounded" />
      <input name="budget" type="number" placeholder="Budget (optional)" onChange={handleChange} value={formData.budget} className="w-full p-2 border rounded" />
      <input name="deadline" type="date" onChange={handleChange} value={formData.deadline} className="w-full p-2 border rounded" />

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
        {loading ? (isEditing ? 'Updating...' : 'Posting...') : (isEditing ? 'Update Job' : 'Post Job')}
      </button>

      {message && <p className={`text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </form>
  );
};

export default JobPostForm;

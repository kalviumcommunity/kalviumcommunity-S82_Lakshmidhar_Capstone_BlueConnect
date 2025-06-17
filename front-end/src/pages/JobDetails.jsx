import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  MapPin, Calendar, DollarSign, ChevronLeft,
  Briefcase, Clock, User
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  useEffect(() => {
    axios.get(`https://capstone-backend-65es.onrender.com/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch job details');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://capstone-backend-65es.onrender.com/api/jobs/${id}/apply`, {
        bidAmount,
        coverLetter
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Application submitted!');
      setBidAmount('');
      setCoverLetter('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return <div className="p-6">Loading...</div>;

  const deadlineDate = new Date(job.deadline);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/find-jobs" className="inline-flex items-center text-blue-600 mb-6">
        <ChevronLeft size={20} />
        <span>Back to Jobs</span>
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title || 'No title'}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={18} className="mr-1" />
                  <span>{job.location || 'Location not provided'}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase size={18} className="mr-1" />
                  <span>{job.category || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-1" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString() || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-1" />
                  <span>
                    {daysRemaining > 0 
                      ? `${daysRemaining} days remaining` 
                      : 'Deadline passed'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center bg-green-100 px-4 py-2 rounded-md">
              <DollarSign size={20} className="text-green-600 mr-1" />
              <span className="text-xl font-bold text-green-700">${job.budget || 'N/A'}</span>
              <span className="text-green-700 ml-1">budget</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{job.description || 'No description provided'}</p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Experience with {job.category?.toLowerCase() || 'general'} projects</li>
                  <li>Own tools and equipment</li>
                  <li>Availability within the specified timeframe</li>
                  <li>Ability to communicate effectively</li>
                  <li>References from previous clients (preferred)</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-gray-500">Map will be displayed here</div>
                </div>
                <p className="mt-3 text-gray-600">{job.location || 'Location not provided'}</p>
              </section>
            </div>
            
            <div>
              <div className="bg-blue-50 rounded-lg p-5 mb-6">
                <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Posted Date</h3>
                      <p className="text-gray-600">{new Date(job.postedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Deadline</h3>
                      <p className="text-gray-600">{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Budget</h3>
                      <p className="text-gray-600">${job.budget}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Category</h3>
                      <p className="text-gray-600">{job.category || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Applicants</h3>
                      <p className="text-gray-600">{job.applicants.length} workers applied</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your bid amount ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your bid"
                      min="1"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe why you're a good fit"
                      rows="4"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

import React from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const deadlineDate = new Date(job.deadline);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{job.title || 'No title'}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium 
            ${job.status === 'open' ? 'bg-green-100 text-green-800' : 
              job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'}`}>
            {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'N/A'}
          </span>
        </div>

        <div className="mt-3 flex items-center text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{job.location || 'Location not provided'}</span>
        </div>

        <div className="mt-1 flex items-center text-gray-600">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">
            Posted: {new Date(job.postedDate).toLocaleDateString() || 'N/A'}
            {daysRemaining > 0 && ` · ${daysRemaining} days remaining`}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-gray-600 line-clamp-3">{job.description || 'No description provided'}</p>
        </div>

        <div className="mt-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2 mb-2">
            {job.category || 'N/A'}
          </span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-gray-800">
            <DollarSign size={18} className="text-green-600" />
            <span className="font-bold text-lg">${job.budget || 'N/A'}</span>
            <span className="text-gray-500 text-sm ml-1">budget</span>
          </div>

          <Link 
            to={`/jobs/${job._id}`} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>

        <div className="mt-3 text-sm text-gray-500">
          {job.applicants.length} {job.applicants.length === 1 ? 'worker' : 'workers'} applied
        </div>
      </div>
    </div>
  );
};

export default JobCard;

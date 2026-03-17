import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Clock, User, CheckCircle2 } from 'lucide-react';

const JobCard = ({ job, showActions = false, onDelete = null }) => {
  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    accepted: "bg-blue-50 text-blue-700 border-blue-100",
    completed: "bg-green-50 text-green-700 border-green-100",
  };

  const formattedDate = new Date(job.created_at).toLocaleDateString();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2 ${statusColors[job.status] || "bg-gray-50 text-gray-500"}`}>
            {job.status}
          </span>
          <div className="flex items-center text-gray-900 font-black">
            <DollarSign size={18} className="text-blue-600" />
            <span className="text-2xl">{job.budget}</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-1 leading-tight tracking-tight">
          {job.title}
        </h3>

        <div className="space-y-3 mb-8">
          <div className="flex items-center text-gray-500 font-medium">
            <MapPin size={18} className="mr-3 text-blue-500" />
            {job.location}
          </div>
          <div className="flex items-center text-gray-500 font-medium">
            <Calendar size={18} className="mr-3 text-blue-500" />
            Posted on {formattedDate}
          </div>
        </div>

        <p className="text-gray-600 line-clamp-2 mb-8 leading-relaxed font-medium">
          {job.description}
        </p>

        <div className="mt-auto pt-8 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
          <Link 
            to={`/jobs/${job.id}`} 
            className="flex-grow text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          
          {showActions && (
            <div className="flex gap-2">
              <button 
                onClick={() => onDelete(job.id)}
                className="p-3 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

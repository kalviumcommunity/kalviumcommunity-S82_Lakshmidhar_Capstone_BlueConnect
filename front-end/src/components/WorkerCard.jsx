import React from 'react';
import { Star, MapPin, Clock, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkerCard = ({ worker }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105">
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <img 
            src={worker.avatar} 
            alt={worker.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h3 className="text-xl font-semibold">{worker.name}</h3>
            <div className="flex items-center space-x-1 text-gray-600 mt-1">
              <MapPin size={16} />
              <span className="text-sm">{worker.location}</span>
            </div>
            <div className="flex items-center space-x-1 text-amber-500 mt-1">
              <Star size={16} className="fill-current" />
              <span className="font-medium">{worker.rating}</span>
              <span className="text-gray-500 text-sm">({worker.completedJobs} jobs)</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2 text-gray-700 mb-2">
            <Briefcase size={16} />
            <span className="text-sm">{worker.experience} years experience</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700 mb-2">
            <Clock size={16} />
            <span className="text-sm">Available: {worker.availability.join(', ')}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mt-3">{worker.about}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {worker.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span className="font-bold text-lg text-blue-700">${worker.hourlyRate}/hr</span>
          <Link 
            to={`/workers/${worker.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Briefcase, Phone } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  // Graceful handling of missing data
  const name = worker.user?.name || worker.name || "Skilled Professional";
  const profession = worker.profession || "General Laborer";
  const location = worker.location || "Not specified";
  const experience = worker.experience_years || 0;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
        <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-3xl border-4 border-white">
          {name.charAt(0)}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-gray-50">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold text-gray-700">4.8</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">{name}</h3>
          <div className="flex items-center text-blue-600 font-medium text-sm">
            <Briefcase size={14} className="mr-1.5" />
            {profession}
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-2" />
            {location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Star size={14} className="mr-2" />
            {experience} years experience
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="text-gray-900 font-bold">
            <span className="text-2xl">$25</span>
            <span className="text-gray-400 text-sm font-normal">/hr</span>
          </div>
          <Link 
            to={`/workers/${worker.id}`} 
            className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;

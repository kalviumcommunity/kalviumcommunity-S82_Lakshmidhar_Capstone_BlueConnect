import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, Clock } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
      <Link to={`/workers/${worker._id}`} className="block">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start">
            {/* Worker Avatar */}
            <img
              src={worker.avatar || 'https://via.placeholder.com/150'}
              alt={worker.name || 'Worker'}
              className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              {/* Worker Name */}
              <h2 className="text-2xl font-semibold text-blue-600">
                {worker.name || 'Unnamed Worker'}
              </h2>

              {/* Worker Location */}
              {worker.location && (
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={18} className="mr-1" />
                  <span>{worker.location}</span>
                </div>
              )}

              {/* Worker Skills */}
              <div className="flex flex-wrap mt-2">
                {Array.isArray(worker.skills) &&
                  worker.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                {Array.isArray(worker.skills) && worker.skills.length > 3 && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    +{worker.skills.length - 3} more
                  </span>
                )}
              </div>

              {/* Worker Rating and Experience */}
              <div className="flex items-center text-gray-600 mt-3">
                <Star size={18} className="text-yellow-400 mr-1" />
                <span className="font-medium">{worker.rating ?? 'N/A'}</span>
                <span className="ml-2 text-sm">
                  ({worker.completedJobs ?? 0} jobs completed)
                </span>
              </div>

              {/* Worker Availability */}
              {Array.isArray(worker.availability) && (
                <div className="flex items-center text-gray-600 mt-2">
                  <Clock size={18} className="mr-1" />
                  <span>{worker.availability.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Worker Hourly Rate */}
            <div className="md:ml-auto mt-4 md:mt-0 text-right">
              <div className="text-xl font-bold text-blue-600">
                ${worker.hourlyRate ?? 'N/A'}/hr
              </div>
              <div className="text-sm text-gray-500 mt-1">Hourly Rate</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkerCard;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Star, MapPin, Clock, Briefcase, Phone,
  Mail, Calendar, ChevronLeft
} from 'lucide-react';

const WorkerDetails = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await axios.get(`https://capstone-backend-65es.onrender.com/api/worker-profile/${id}`);
        setWorker(response.data);
        setLoading(false);
      } catch (err) {
        setError('Worker not found');
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/workers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        <span>Back to Workers</span>
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <img
              src={worker.avatar || 'https://via.placeholder.com/150'}
              alt={worker.name || 'Worker'}
              className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold">{worker.name || 'Unnamed Worker'}</h1>
              <div className="flex items-center mt-2">
                <MapPin size={18} className="mr-1" />
                <span>{worker.location || 'Unknown location'}</span>
              </div>
              <div className="flex items-center mt-1">
                <Star size={18} className="text-yellow-300 fill-current mr-1" />
                <span className="font-medium">{worker.rating ?? 'N/A'}</span>
                <span className="ml-1">({worker.completedJobs ?? 0} jobs completed)</span>
              </div>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0">
              <span className="block text-2xl font-bold">${worker.hourlyRate ?? '0'}/hr</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600">{worker.about || 'No description available.'}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                {Array.isArray(worker.skills) && worker.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No skills listed.</p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {/* Future review items can go here */}
                  <p className="text-gray-500">No reviews available yet.</p>
                </div>
                <Link to="#" className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  See all reviews
                </Link>
              </section>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Experience</h3>
                      <p className="text-gray-600">{worker.experience ?? 'Not specified'} years</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Availability</h3>
                      <p className="text-gray-600">
                        {Array.isArray(worker.availability)
                          ? worker.availability.join(', ')
                          : worker.availability || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Jobs Completed</h3>
                      <p className="text-gray-600">{worker.completedJobs ?? 0} jobs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-3 flex justify-center items-center">
                  <Mail size={18} className="mr-2" />
                  Send Message
                </button>

                <button className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex justify-center items-center">
                  <Phone size={18} className="mr-2" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { workerService } from '../services/api';
import { MapPin, Star, Briefcase, Phone, Mail, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';

const WorkerDetails = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const { data } = await workerService.getWorker(id);
        setWorker(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load worker details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading professional profile...</p>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{error || "Worker not found."}</p>
        <Link to="/workers" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
          Back to Workers
        </Link>
      </div>
    );
  }

  const name = worker.user?.name || "Professional";
  const profession = worker.profession || "General Laborer";

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-600 h-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto -mt-32 relative z-10">
          <Link to="/workers" className="inline-flex items-center text-white/80 hover:text-white font-medium mb-6 transition">
            <ArrowLeft size={18} className="mr-2" />
            Back to Discovery
          </Link>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-black text-6xl shadow-inner border-4 border-white">
                  {name.charAt(0)}
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{name}</h1>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-lg text-blue-600 font-bold">
                        <span className="flex items-center">
                          <Briefcase size={20} className="mr-2" />
                          {profession}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="flex items-center">
                          <Star size={20} className="mr-2 text-yellow-400 fill-yellow-400" />
                          4.9 (42 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95">
                         Hire Now
                       </button>
                       <button className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition">
                         Send Message
                       </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 border-y border-gray-50 my-8">
                    <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Location</div>
                        <div className="text-gray-900 font-bold">{worker.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Experience</div>
                        <div className="text-gray-900 font-bold">{worker.experience_years} Years</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-4">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Status</div>
                        <div className="text-gray-900 font-bold">Verified Professional</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-black text-gray-900 mb-6">About Me</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-10">
                        {worker.bio || "No biography provided. This professional is dedicated to providing high-quality service and exceptional results for every client."}
                      </p>

                      <h3 className="text-2xl font-black text-gray-900 mb-6">Verified Skills</h3>
                      <div className="flex flex-wrap gap-3">
                        {worker.profession.split(',').map((skill, idx) => (
                          <span key={idx} className="px-6 py-2 bg-white border-2 border-blue-50 text-blue-700 font-bold rounded-full text-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-blue-600 p-8 rounded-[2rem] text-white">
                        <h4 className="text-xl font-bold mb-4">Contact Information</h4>
                        <div className="space-y-6">
                          <a href={`mailto:${worker.contact}`} className="flex items-center group">
                            <Mail className="mr-4 text-blue-200 group-hover:text-white transition" />
                            <span className="font-medium truncate">{worker.contact}</span>
                          </a>
                          <div className="flex items-center">
                            <Phone className="mr-4 text-blue-200" />
                            <span className="font-medium">+1 (555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import { 
  MapPin, Clock, DollarSign, User, 
  ArrowLeft, CheckCircle2, AlertCircle, 
  Calendar, Briefcase, FileText
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await jobService.getJobs();
        const foundJob = data.find(j => j.id === parseInt(id));
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError('Job not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleAccept = async () => {
    setActionLoading(true);
    try {
      await jobService.acceptJob(id);
      alert('Job accepted successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to accept job. Make sure you are logged in as a worker.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    setActionLoading(true);
    try {
      await jobService.completeJob(id);
      alert('Job marked as completed!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to complete job.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading task details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-8">{error || "The request you're looking for doesn't exist."}</p>
        <Link to="/find-jobs" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isWorker = currentUser?.role === 'worker';
  const isRequester = currentUser?.id === job.requester_id;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-600 h-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto -mt-32 relative z-10">
          <Link to="/find-jobs" className="inline-flex items-center text-white/90 hover:text-white font-medium mb-6 transition">
            <ArrowLeft size={18} className="mr-2" />
            Back to Jobs
          </Link>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 ${
                      job.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      job.status === 'accepted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-green-50 text-green-700 border-green-100'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">ID: #{job.id}</span>
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-gray-500 font-medium">
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-blue-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-blue-500" />
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="md:text-right">
                  <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 inline-block text-center min-w-[160px]">
                    <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Budget</div>
                    <div className="text-3xl font-black text-blue-600">${job.budget}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div className="mb-10">
                    <h3 className="flex items-center text-xl font-black text-gray-900 mb-4">
                      <FileText size={20} className="mr-3 text-blue-600" />
                      Job Description
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>

                  {job.requirements && (
                    <div className="mb-10">
                      <h3 className="flex items-center text-xl font-black text-gray-900 mb-4">
                        <CheckCircle2 size={20} className="mr-3 text-blue-600" />
                        Specific Requirements
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {job.requirements}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h4 className="text-lg font-black text-gray-900 mb-6">Action Center</h4>
                    
                    {isWorker && job.status === 'pending' && (
                      <button 
                        onClick={handleAccept}
                        disabled={actionLoading}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : 'Accept This Job'}
                      </button>
                    )}

                    {(isRequester || (isWorker && job.worker_id === currentUser?.id)) && job.status === 'accepted' && (
                      <button 
                        onClick={handleComplete}
                        disabled={actionLoading}
                        className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-100 hover:bg-green-700 transition active:scale-95 disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : 'Mark as Completed'}
                      </button>
                    )}

                    {!isWorker && !isRequester && job.status === 'pending' && (
                       <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium border border-blue-100">
                         Login as a worker to accept this job.
                       </div>
                    )}

                    {job.status === 'completed' && (
                      <div className="p-4 bg-green-50 text-green-700 rounded-2xl text-center border border-green-100 font-bold">
                        Job Successfully Completed
                      </div>
                    )}
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

export default JobDetails;

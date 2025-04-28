import React from 'react';
import { ArrowRight, Search, Briefcase, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkerCard from '../components/WorkerCard';
import workers from '../data/WorkersData';

const Home = () => {
  const featuredWorkers = workers.slice(0, 3);

  return (
    <div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Skilled Blue Collar Workers For Your Next Project
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with reliable professionals for plumbing, electrical work, carpentry, and more.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/workers" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
                Find Workers
              </Link>
              <Link to="/post-job" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md border border-blue-400 hover:bg-blue-700 transition">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Search className="h-8 w-8 text-white" />, title: "Search", desc: "Browse through our directory of skilled workers or post a job with your specific requirements." },
              { icon: <Briefcase className="h-8 w-8 text-white" />, title: "Connect", desc: "Review profiles, check ratings, and connect with workers who match your needs and budget." },
              { icon: <Check className="h-8 w-8 text-white" />, title: "Complete", desc: "Hire with confidence, get your project completed, and leave a review for the worker." },
            ].map((step, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Workers</h2>
            <Link to="/workers" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkers.map(worker => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Robert Johnson", role: "Homeowner", feedback: "I found an excellent electrician through WorkerConnect. He was professional, punctual, and did a fantastic job rewiring my home office." },
              { name: "Maria Garcia", role: "Plumber", feedback: "As a plumber, this platform has helped me find consistent work in my local area. The job posting system is straightforward and the client connections are valuable." },
              { name: "James Wilson", role: "Business Owner", feedback: "I needed a carpenter for a custom shelving project. Through WorkerConnect, I was able to compare portfolios and find someone with exactly the style I was looking for." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners and business owners who have found the perfect workers for their projects.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition">
              Create an Account
            </Link>
            <Link to="/workers" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md border border-blue-400 hover:bg-blue-700 transition">
              Browse Workers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

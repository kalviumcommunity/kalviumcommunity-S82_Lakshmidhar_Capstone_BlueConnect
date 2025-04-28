import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';

const SearchFilters = ({ onSearch, type }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minRating, setMinRating] = useState('');
  
  const [category, setCategory] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  
  const skills = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 
    'Landscaping', 'Cleaning', 'Welding', 'Roofing', 'Drywall'
  ];
  
  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 
    'Landscaping', 'Cleaning', 'Welding', 'Roofing', 'Construction'
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    const filters = {
      keyword,
      location,
      ...(type === 'workers' ? {
        skills: selectedSkills,
        minRate: minRate ? parseFloat(minRate) : undefined,
        maxRate: maxRate ? parseFloat(maxRate) : undefined,
        minRating: minRating ? parseFloat(minRating) : undefined,
      } : {
        category,
        minBudget: minBudget ? parseFloat(minBudget) : undefined,
        maxBudget: maxBudget ? parseFloat(maxBudget) : undefined,
      })
    };
    
    onSearch(filters);
  };
  
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const clearFilters = () => {
    setKeyword('');
    setLocation('');
    setSelectedSkills([]);
    setMinRate('');
    setMaxRate('');
    setMinRating('');
    setCategory('');
    setMinBudget('');
    setMaxBudget('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-grow min-w-[200px]">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${type === 'workers' ? 'workers' : 'jobs'}...`}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          
          <div className="relative flex-grow min-w-[200px]">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <button
            type="button"
            className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-medium text-gray-700">Advanced Filters</h3>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={clearFilters}
              >
                <X size={16} className="mr-1" />
                Clear Filters
              </button>
            </div>
            
            {type === 'workers' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1">
                    {skills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSkills.includes(skill)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="px-3 py-2 border rounded-md"
                      value={minRate}
                      onChange={(e) => setMinRate(e.target.value)}
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="px-3 py-2 border rounded-md"
                      value={maxRate}
                      onChange={(e) => setMaxRate(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                  <select
                    className="px-3 py-2 border rounded-md w-full"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="px-3 py-2 border rounded-md w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="px-3 py-2 border rounded-md"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="px-3 py-2 border rounded-md"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;

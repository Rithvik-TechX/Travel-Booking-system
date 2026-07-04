import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/packages');
    }
  };

  const handleQuickSearch = (destination: string) => {
    navigate(`/packages?search=${encodeURIComponent(destination)}`);
  };

  return (
    <div
      className="relative h-screen max-h-[800px] min-h-[600px] bg-cover bg-center"
      style={{ backgroundImage: 'url(/H61.jpg)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Discover the World with TravelEase
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-white">
            Explore curated travel packages from expert agents around the globe.
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-0 focus:ring-0 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="ml-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleQuickSearch('Bali')} className="text-white hover:text-blue-200 font-medium">
                Bali
              </button>
              <span className="text-gray-400">•</span>
              <button onClick={() => handleQuickSearch('Japan')} className="text-white hover:text-blue-200 font-medium">
                Japan
              </button>
              <span className="text-gray-400">•</span>
              <button onClick={() => handleQuickSearch('Switzerland')} className="text-white hover:text-blue-200 font-medium">
                Switzerland
              </button>
              <span className="text-gray-400">•</span>
              <button onClick={() => handleQuickSearch('Maldives')} className="text-white hover:text-blue-200 font-medium">
                Maldives
              </button>
              <span className="text-gray-400">•</span>
              <button onClick={() => handleQuickSearch('Dubai')} className="text-white hover:text-blue-200 font-medium">
                Dubai
              </button>
              <span className="text-gray-400">•</span>
              <Link to="/packages" className="text-white hover:text-blue-200 font-medium">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    </div>
  );
};

export default HeroSection;

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../types';
import Button from '../common/Button';

interface SearchFiltersProps {
  onFilter: (filters: SearchFiltersType) => void;
  initialSearch?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilter, initialSearch }) => {
  const [destination, setDestination] = useState(initialSearch || '');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState<number | undefined>(undefined);

  // Sync initial search from URL
  useEffect(() => {
    if (initialSearch && initialSearch !== destination) {
      setDestination(initialSearch);
    }
  }, [initialSearch]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      destination: destination || undefined,
      minPrice,
      maxPrice,
      duration,
    });
  };
  
  const handleReset = () => {
    setDestination('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setDuration(undefined);
    onFilter({});
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Search Packages</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="search-destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              id="search-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="filter-minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id="filter-minPrice"
                  min={0}
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                  placeholder="0"
                  className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="filter-maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id="filter-maxPrice"
                  min={0}
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                  placeholder="Any"
                  className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="filter-duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days)
            </label>
            <input
              type="number"
              id="filter-duration"
              min={1}
              value={duration || ''}
              onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value, 10) : undefined)}
              placeholder="Any"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button
              type="submit"
              className="inline-flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
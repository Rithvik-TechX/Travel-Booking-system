import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePackages } from '../../context/PackagesContext';
import { TravelPackage, SearchFilters } from '../../types';
import MainLayout from '../layouts/MainLayout';
import SearchFiltersComponent from '../../components/traveler/SearchFilters';
import PackageCard from '../../components/common/PackageCard';

const PackagesPage: React.FC = () => {
  const { packages } = usePackages();
  const [searchParams] = useSearchParams();
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>(packages);
  const [filters, setFilters] = useState<SearchFilters>({});
  
  // Pick up search query from URL (from hero search)
  useEffect(() => {
    const search = searchParams.get('search') || searchParams.get('destination') || '';
    if (search) {
      setFilters(prev => ({ ...prev, destination: search }));
    }
  }, [searchParams]);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...packages];
    
    if (filters.destination) {
      const searchTerm = filters.destination.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm) || 
        pkg.destination.toLowerCase().includes(searchTerm) ||
        pkg.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.minPrice !== undefined) {
      result = result.filter(pkg => pkg.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(pkg => pkg.price <= filters.maxPrice!);
    }
    
    if (filters.duration !== undefined) {
      result = result.filter(pkg => pkg.duration === filters.duration);
    }
    
    setFilteredPackages(result);
  }, [filters, packages]);
  
  const handleFilter = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Travel Packages</h1>
          <p className="text-gray-600 mb-8">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFiltersComponent onFilter={handleFilter} initialSearch={filters.destination} />
            </div>
            
            <div className="lg:col-span-3">
              {filteredPackages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No packages found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search filters to find more travel options.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map(pkg => (
                    <div key={pkg.id} className="h-full">
                      <PackageCard travelPackage={pkg} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PackagesPage;
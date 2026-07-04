import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TravelPackage } from '../../types';
import PackageCard from '../common/PackageCard';
import { Link } from 'react-router-dom';

interface FeaturedPackagesProps {
  packages: TravelPackage[];
}

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ packages }) => {
  // Filter to only show featured packages or up to 3 packages if none are featured
  const featuredPackages = packages.filter(pkg => pkg.featured).length > 0
    ? packages.filter(pkg => pkg.featured).slice(0, 3)
    : packages.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Travel Packages</h2>
          <p className="mt-4 text-xl text-gray-600">Explore our handpicked selection of extraordinary destinations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map(pkg => (
            <div key={pkg.id} className="h-full">
              <PackageCard travelPackage={pkg} variant="large" />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View All Packages
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
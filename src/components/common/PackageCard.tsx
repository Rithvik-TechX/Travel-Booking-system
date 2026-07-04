import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { TravelPackage } from '../../types';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  travelPackage: TravelPackage;
  variant?: 'small' | 'large';
}

const PackageCard: React.FC<PackageCardProps> = ({ travelPackage, variant = 'small' }) => {
  const { id, title, description, destination, duration, price, imageUrl, featured } = travelPackage;
  
  if (variant === 'large') {
    return (
      <Link to={`/packages/${id}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-64 object-cover"
            />
            {featured && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 m-2 rounded-md font-medium text-sm">
                Featured
              </div>
            )}
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mr-1" />
              <span>{destination}</span>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{description.length > 150 ? `${description.substring(0, 150)}...` : description}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 text-blue-600 mr-1" />
                <span>{duration} days</span>
              </div>
              <div className="flex items-center text-gray-900 font-bold">
                <span className="text-green-600 mr-1">₹</span>
                <span>{price.toLocaleString()}</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/packages/${id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          {featured && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-2 py-1 m-2 rounded-md font-medium text-xs">
              Featured
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 text-blue-600 mr-1" />
            <span>{destination}</span>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2">
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
              <span>{duration} days</span>
            </div>
            <div className="flex items-center text-gray-900 font-bold">
              <span className="text-green-600 mr-1">₹</span>
              <span>{price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
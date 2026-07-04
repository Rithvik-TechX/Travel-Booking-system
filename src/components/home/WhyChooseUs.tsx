import React from 'react';
import { Award, Globe, Shield, Users } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      name: 'Expert Travel Agents',
      description: 'Our platform connects you with experienced travel professionals who craft unforgettable journeys.',
      icon: Users,
    },
    {
      name: 'Curated Destinations',
      description: 'Discover handpicked destinations and expertly designed itineraries for every type of traveler.',
      icon: Globe,
    },
    {
      name: 'Secure Bookings',
      description: 'Book with confidence knowing your travel plans are protected with our secure booking system.',
      icon: Shield,
    },
    {
      name: 'Award-Winning Service',
      description: 'Experience the difference with our dedication to exceptional customer service at every step.',
      icon: Award,
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose TravelEase</h2>
          <p className="mt-4 text-xl text-gray-600">Making travel planning easy and enjoyable</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
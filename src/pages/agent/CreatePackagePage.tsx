import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TravelPackage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePackages } from '../../context/PackagesContext';
import { useToast } from '../../context/ToastContext';
import MainLayout from '../layouts/MainLayout';
import PackageForm from '../../components/agent/PackageForm';

const CreatePackagePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addPackage } = usePackages();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (data: Partial<TravelPackage>) => {
    const newPackage: TravelPackage = {
      id: uuidv4(),
      title: data.title || '',
      description: data.description || '',
      destination: data.destination || '',
      duration: data.duration || 1,
      price: data.price || 0,
      imageUrl: data.imageUrl || '',
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || [],
      itinerary: data.itinerary || [],
      agentId: currentUser?.id || '',
      createdAt: new Date().toISOString(),
      featured: data.featured || false,
    };
    
    addPackage(newPackage);
    showToast('Package created successfully!', 'success');
    navigate('/agent/dashboard');
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Travel Package</h1>
            <p className="mt-2 text-gray-600">
              Fill in the details below to create a new travel package.
            </p>
          </div>
          
          <PackageForm
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePackagePage;
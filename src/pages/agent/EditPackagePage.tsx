import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TravelPackage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePackages } from '../../context/PackagesContext';
import { useToast } from '../../context/ToastContext';
import MainLayout from '../layouts/MainLayout';
import PackageForm from '../../components/agent/PackageForm';

const EditPackagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { getPackageById, updatePackage } = usePackages();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const travelPackage = id ? getPackageById(id) : undefined;
  const isOwner = travelPackage && currentUser && travelPackage.agentId === currentUser.id;
  
  const handleSubmit = (data: Partial<TravelPackage>) => {
    if (id) {
      updatePackage(id, data);
      showToast('Package updated successfully!', 'success');
      navigate('/agent/dashboard');
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Travel Package</h1>
            <p className="mt-2 text-gray-600">
              Update the details of your travel package.
            </p>
          </div>
          
          {!travelPackage ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Package Not Found</h3>
              <p className="text-gray-600">The package you're trying to edit doesn't exist.</p>
            </div>
          ) : !isOwner ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Access Denied</h3>
              <p className="text-gray-600">You do not have permission to edit this package.</p>
            </div>
          ) : (
            <PackageForm
              initialData={travelPackage}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EditPackagePage;
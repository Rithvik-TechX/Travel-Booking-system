import React from 'react';
import { useParams } from 'react-router-dom';
import { usePackages } from '../../context/PackagesContext';
import MainLayout from '../layouts/MainLayout';
import PackageDetail from '../../components/traveler/PackageDetail';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPackageById } = usePackages();

  const travelPackage = id ? getPackageById(id) : undefined;

  return (
    <MainLayout>
      <div className="bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!travelPackage ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Package Not Found</h3>
              <p className="text-gray-600">The travel package you're looking for doesn't exist.</p>
            </div>
          ) : (
            <PackageDetail travelPackage={travelPackage} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PackageDetailPage;
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TravelPackage } from '../types';
import { mockPackages } from '../data/mockData';

interface PackagesContextType {
  packages: TravelPackage[];
  addPackage: (pkg: TravelPackage) => void;
  updatePackage: (id: string, data: Partial<TravelPackage>) => void;
  deletePackage: (id: string) => void;
  getPackageById: (id: string) => TravelPackage | undefined;
  getPackagesByAgent: (agentId: string) => TravelPackage[];
}

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

const STORAGE_KEY = 'travelease_packages';

export const PackagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading packages from storage:', e);
    }
    return mockPackages;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  }, [packages]);

  const addPackage = (pkg: TravelPackage) => {
    setPackages(prev => [pkg, ...prev]);
  };

  const updatePackage = (id: string, data: Partial<TravelPackage>) => {
    setPackages(prev =>
      prev.map(pkg => (pkg.id === id ? { ...pkg, ...data } : pkg))
    );
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const getPackageById = (id: string) => {
    return packages.find(pkg => pkg.id === id);
  };

  const getPackagesByAgent = (agentId: string) => {
    return packages.filter(pkg => pkg.agentId === agentId);
  };

  return (
    <PackagesContext.Provider value={{
      packages,
      addPackage,
      updatePackage,
      deletePackage,
      getPackageById,
      getPackagesByAgent,
    }}>
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => {
  const context = useContext(PackagesContext);
  if (context === undefined) {
    throw new Error('usePackages must be used within a PackagesProvider');
  }
  return context;
};

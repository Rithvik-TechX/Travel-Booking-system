import React from 'react';
import { usePackages } from '../context/PackagesContext';
import HeroSection from '../components/home/HeroSection';
import FeaturedPackages from '../components/home/FeaturedPackages';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import MainLayout from './layouts/MainLayout';

const HomePage: React.FC = () => {
  const { packages } = usePackages();

  return (
    <MainLayout>
      <HeroSection />
      <FeaturedPackages packages={packages} />
      <WhyChooseUs />
      <Testimonials />
    </MainLayout>
  );
};

export default HomePage;
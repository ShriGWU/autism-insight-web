
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';
import InfoSection from '../components/InfoSection';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <InfoSection />
    </Layout>
  );
};

export default Home;

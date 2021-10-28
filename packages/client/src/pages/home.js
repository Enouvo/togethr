import React from 'react';
import Discover from '../components/Home/Discover';
import HomeFeaturing from '../components/Home/HomeFeaturingContent';
import HomeHotCollectionContent from '../components/Home/HomeHotCollectionContent';
import PopularProjects from '../components/Home/PopularProject';

const Home = () => {
  return (
    <>
      <HomeFeaturing />
      <Discover />
      <PopularProjects />
      <HomeHotCollectionContent />
    </>
  );
};

export default Home;

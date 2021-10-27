import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Header from '../components/Header';
import HomeFeaturing from '../components/Home/HomeFeaturingContent';
import HomeHotCollectionContent from '../components/Home/HomeHotCollectionContent';
import Discover from '../components/Home/Discover';
import PopularProjects from '../components/Home/PopularProject';
import Footer from '../components/Footer';
import useGetProjects from '../hooks/useProjects';
import ProjectsProvider from '../providers/ProjectProvider';

const Home = () => {
  return (
    <ProjectsProvider>
      <HomeFeaturing />
      <Discover />
      <PopularProjects />
      <HomeHotCollectionContent />
    </ProjectsProvider>
  );
};

export default Home;

import React from 'react';
import Discover from '../components/Home/Discover';
import HomeFeaturingContent from '../components/Home/HomeFeaturingContent';
import HomeHotCollectionContent from '../components/Home/HomeHotCollectionContent';
import PopularProjects from '../components/Home/PopularProject';
import { Spin } from 'antd';
import { useProjectContext } from '../providers/ProjectProvider';
import Loading from '../components/Loading';
import useProjects from '../hooks/useProjects';
import NFTs from '../components/Home/NFTs';

const Home = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <HomeFeaturingContent projects={projects} />
      <Discover />
      <NFTs />
    </>
  );
};

export default Home;

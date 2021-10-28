import React from "react";
import Discover from "../components/Home/Discover";
import HomeFeaturing from "../components/Home/HomeFeaturingContent";
import HomeHotCollectionContent from "../components/Home/HomeHotCollectionContent";
import PopularProjects from "../components/Home/PopularProject";
import { Spin } from "antd";
import { useProjectContext } from "../providers/ProjectProvider";

const Home = () => {
  const { loading } = useProjectContext();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );

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

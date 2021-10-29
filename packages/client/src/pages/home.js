import React from "react";
import Discover from "../components/Home/Discover";
import HomeFeaturing from "../components/Home/HomeFeaturingContent";
import HomeHotCollectionContent from "../components/Home/HomeHotCollectionContent";
import PopularProjects from "../components/Home/PopularProject";
import { Spin } from "antd";
import { useProjectContext } from "../providers/ProjectProvider";
import Loading from "../components/Loading";
const Home = () => {
  const { loading } = useProjectContext();

  if (loading) return <Loading />;
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

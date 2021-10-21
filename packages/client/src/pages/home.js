import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import Header from "../components/Header";
import HomeFeaturing from "../components/Home/HomeFeaturingContent";
import HomeHotCollectionContent from "../components/Home/HomeHotCollectionContent";
import Discover from "../components/Home/Discover";
import PopularProjects from "../components/Home/PopularProject";
import Footer from "../components/Footer";

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

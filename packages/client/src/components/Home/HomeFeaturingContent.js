import React, { useState } from 'react';
import banner from '../../assets/home_content_banner.svg';
import ProjectDetail from '../ProjectDetails/ProjectDetail';
import ProjectDetailCarousel from '../ProjectDetails/ProjectDetailCarousel';
const HomeFeaturingContent = ({ projects }) => {
  const latestProject = projects[projects.length - 1];

  return (
    <div className="flex flex-col justify-between">
      <img src={banner} />
      <ProjectDetailCarousel />
    </div>
  );
};

export default HomeFeaturingContent;

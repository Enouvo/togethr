import React, { useState } from "react";
import banner from "../../assets/home_content_banner.svg";
import ProjectDetail from "../ProjectDetails/ProjectDetail";
import ProjectDetailCarousel from "../ProjectDetails/ProjectDetailCarousel";
const HomeFeaturingContent = ({ projects }) => {
  const lastThreeProjects = projects.slice(
    projects.length - 3,
    projects.length
  );

  return (
    <div className="flex flex-col justify-between">
      <img src={banner} />
      <ProjectDetailCarousel projects={lastThreeProjects} />
    </div>
  );
};

export default HomeFeaturingContent;

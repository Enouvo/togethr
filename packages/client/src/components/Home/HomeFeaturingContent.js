import { Typography } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import banner from '../../assets/home_content_banner.svg';
import ProjectDetail from '../ProjectDetails/ProjectDetail';
import ProjectDetailCarousel from '../ProjectDetails/ProjectDetailCarousel';

const HomeFeaturingContent = ({ projects }) => {
  const history = useHistory();
  const [tokenCount, setTokenCount] = useState('');
  const fundedProjects = projects.filter((project) => project.status !== 'FUNDED');
  const latestProject = fundedProjects[fundedProjects.length - 1];

  const clickProjectDetail = (projectID) => {
    history.push(`/projects/${projectID}`);
  };

  return (
    <div className="flex flex-col justify-between">
      <img src={banner} />
      <div className="px-48 mb-10 mt-20 xs:px-6 sm:px-12 md:px-24">
        <Typography className="text-3xl font-extrabold sm:mt-2 md:mt-2">Highlighted Funding Projects</Typography>
      </div>
      <ProjectDetail project={{ ...latestProject }} onClick={clickProjectDetail} />
    </div>
  );
};

export default HomeFeaturingContent;

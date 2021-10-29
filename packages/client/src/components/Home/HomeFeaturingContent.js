import axios from 'axios';
import React, { useEffect, useState } from 'react';
import banner from '../../assets/home_content_banner.svg';
import { useProjectContext } from '../../providers/ProjectProvider';
import { getIpfs } from '../../utils/ipfs';
import ProjectDetail from '../ProjectDetails/ProjectDetail';

const HomeFeaturingContent = () => {
  const { projects } = useProjectContext();
  const latestProject = projects[projects.length - 1];

  return (
    <div className="flex flex-col justify-between">
      <img src={banner} />
      <ProjectDetail project={{ ...latestProject }} />
    </div>
  );
};

export default HomeFeaturingContent;

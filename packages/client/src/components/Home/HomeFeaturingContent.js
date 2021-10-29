import axios from 'axios';
import React, { useEffect, useState } from 'react';
import banner from '../../assets/home_content_banner.svg';
import { useProjectContext } from '../../providers/ProjectProvider';
import { getIpfs } from '../../utils/ipfs';
import ProjectDetail from '../ProjectDetails/ProjectDetail';

const HomeFeaturingContent = () => {
  const { projects } = useProjectContext();
  const [tokenCount, setTokenCount] = useState('');
  const projectIds = Object.keys(projects);
  const projectValues = Object.values(projects);
  const latestProjectId = projectIds[projectIds.length - 1];
  const latestProject = projectValues[projectValues.length - 1];

  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <ProjectDetail project={{ ...latestProject, projectId: latestProjectId }} />
    </div>
  );
};

export default HomeFeaturingContent;

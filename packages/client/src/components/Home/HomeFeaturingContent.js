import axios from 'axios';
import React, { useEffect, useState } from 'react';
import banner from '../../assets/home_content_banner.svg';
import { useProjectContext } from '../../providers/ProjectProvider';
import { getIpfs } from '../../utils/ipfs';
import ProjectDetail from '../ProjectDetails/ProjectDetail';

const HomeFeaturingContent = () => {
  const { projects } = useProjectContext();
  const [tokenCount, setTokenCount] = useState('');
  const [projectDetail, setProjectDetail] = useState({});
  const projectIds = Object.keys(projects);
  const latestProjectId = projectIds[projectIds.length - 1];

  const projectValues = Object.values(projects);
  const latestProject = projectValues[projectValues.length - 1];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectIpfsUrl = getIpfs(projects['1']?.ipfsHash);
        if (projectIpfsUrl) {
          const { data } = await axios.get(projectIpfsUrl);
          setProjectDetail(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [projects]);

  return (
    <div className="flex flex-col justify-center">
      <img src={banner} />
      <ProjectDetail project={{ ...projectDetail, ...latestProject }} />
    </div>
  );
};

export default HomeFeaturingContent;

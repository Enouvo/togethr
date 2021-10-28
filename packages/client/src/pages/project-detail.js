import React from 'react';
import ProjectDetailsFeaturing from '../components/ProjectDetails/ProjectDetailsFeaturing';
import ProjectDetailsMainContent from '../components/ProjectDetails/ProjectDetailsMainContent';
import { useUserContext } from '../providers/UserProvider';

const ProjectDetail = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <>
      <ProjectDetailsFeaturing />
      <ProjectDetailsMainContent />
    </>
  );
};

export default ProjectDetail;

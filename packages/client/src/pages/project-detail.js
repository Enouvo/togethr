import React from 'react';
import ProjectDetailsFeaturing from '../components/ProjectDetails/ProjectDetailsFeaturing';
import ProjectDetailsMainContent from '../components/ProjectDetails/ProjectDetailsMainContent';
import { useUserContext } from '../providers/UserProvider';

const ProjectDetailPage = () => {
  const { user } = useUserContext();
  return (
    <>
      <ProjectDetailsFeaturing />
      <ProjectDetailsMainContent />
    </>
  );
};

export default ProjectDetailPage;

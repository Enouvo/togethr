import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetails/ProjectDetail';
import ProjectDetailsFeaturing from '../components/ProjectDetails/ProjectDetailsFeaturing';
import ProjectDetailsMainContent from '../components/ProjectDetails/ProjectDetailsMainContent';
import useProject from '../hooks/useProject';
import { useUserContext } from '../providers/UserProvider';

const ProjectDetailPage = () => {
  const { id: projectId } = useParams();
  const { user } = useUserContext();
  const { project, loading } = useProject(Number(projectId));
  return (
    <>
      <ProjectDetail project={project} />
    </>
  );
};

export default ProjectDetailPage;

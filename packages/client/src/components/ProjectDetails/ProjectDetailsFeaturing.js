import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';

const ProjectDetailsFeaturing = () => {
  const { id: projectId } = useParams();
  return (
    <ProjectDetail
      project={{
        projectId: projectId,
      }}
    />
  );
};

export default ProjectDetailsFeaturing;

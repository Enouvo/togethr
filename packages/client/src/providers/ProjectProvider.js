import React, { createContext, useContext } from 'react';
import useProjects from '../hooks/useProjects';

const ProjectsContext = createContext();

export default function ProjectsProvider({ children }) {
  const { projects, createProject } = useProjects();

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        createProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

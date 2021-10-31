import React, { useContext, createContext } from "react";
import useProjects from "../hooks/useProjects";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { projects, loading } = useProjects();
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectsContext);
};

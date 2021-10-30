import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetails/ProjectDetail";
import useProject from "../hooks/useProject";
import { useUserContext } from "../providers/UserProvider";
import { Typography } from "antd";

const MyProjectsPage = () => {
  const { id: projectId } = useParams();
  const { user } = useUserContext();
  const { project, loading } = useProject(Number(projectId));
  return (
    <>
      <ProjectDetail project={project} loading={loading} showPageTitle />
    </>
  );
};

export default MyProjectsPage;

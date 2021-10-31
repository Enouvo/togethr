import React, { useEffect, useState } from "react";
import ProjectDetail from "../components/ProjectDetails/ProjectDetail";
import { getProjectsByAddress } from "../flow/flow";
import { useUserContext } from "../providers/UserProvider";
import { getIpfs } from "../utils/ipfs";
import axios from "axios";
import { Row, Col, Empty, Button } from "antd";
import DiscoverItem from "../components/Home/DiscoverItem";
import { useHistory } from "react-router-dom";

const MyProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const history = useHistory();

  const navigateToCreateProject = () => {
    history.push("/create-project");
  };
  useEffect(() => {
    const fetchProjectsByAdress = async () => {
      setLoading(true);
      const response = await getProjectsByAddress(user.addr);
      const res = await Promise.all(
        Object.values(response).map((project) =>
          axios.get(getIpfs(project?.ipfsHash))
        )
      );
      const projects = Object.keys(response).map((key, index) => ({
        projectId: key,
        ...response[key],
        ...res[index]?.data,
      }));
      setProjects(projects);
      setLoading(false);
    };
    fetchProjectsByAdress();
  }, []);
  const fundedProjects = projects.filter(
    (project) => project.status === "FUNDED"
  );
  const latestProject = fundedProjects[fundedProjects.length - 1];

  const minProject = (project) => {
    history.push(`/mint-project/${project.projectId}`);
  };

  return (
    <div className={latestProject ? "mt-16 mb-16" : "mt-32 mb-16"}>
      {!latestProject ? (
        <Empty description="No projects">
          <Button type="primary" size="large" onClick={navigateToCreateProject}>
            Create now
          </Button>
        </Empty>
      ) : (
        <>
          <ProjectDetail project={latestProject} minProject={minProject} />
          <div className="px-48 pt-24 xs:px-6 sm:px-12 md:px-24">
            <Row gutter={[60, 80]}>
              {projects?.map((item) => {
                return (
                  <Col
                    xm={24}
                    md={12}
                    lg={12}
                    xl={6}
                    key={item.projectId}
                    flex={1}
                  >
                    <DiscoverItem
                      project={item}
                      minProject={() => minProject(item)}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProjectsPage;

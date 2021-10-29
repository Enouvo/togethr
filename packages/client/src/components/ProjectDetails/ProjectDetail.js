import { Avatar, Button, Input, Progress, notification } from "antd";
import React, { useEffect, useState } from "react";
import creator from "../../assets/dappstarter.png";
import { fundProject, getRemainingTokenCount } from "../../flow/flow";
import { useUserContext } from "../../providers/UserProvider";
import { getIpfs } from "../../utils/ipfs";
import SkeletonLoading from "./SkeletonLoading";
import axios from "axios";

const ProjectDetail = ({ project }) => {
  const [tokenCount, setTokenCount] = useState("");
  const [inputError, setInputError] = useState(true);
  const { user, loggedIn, tools } = useUserContext();
  const [projectDetail, setProjectDetail] = useState(project);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!inputError)
      try {
        const fundProjectData = {
          projectId: Number(project.projectId),
          funder: user.addr,
          tokenCount: Number(tokenCount),
        };
        await fundProject(fundProjectData);
        notification.success({ message: "Funded project success!" });
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        if (!project?.ipfsHash) return;
        const projectIpfsUrl = getIpfs(project?.ipfsHash);
        const [{ data }, remainningToken] = await Promise.all([
          axios.get(projectIpfsUrl),
          getRemainingTokenCount(Number(project.projectId)),
        ]);
        setProjectDetail((project) => ({
          ...project,
          ...data,
          remainningToken: remainningToken,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [project?.ipfsHash]);

  useEffect(() => {
    if (typeof tokenCount !== "number" && Number(tokenCount) <= 0)
      setInputError(true);
    else setInputError(false);
  }, [tokenCount]);

  console.log(projectDetail);

  return (
    <div className="flex flex-row justify-around p-32">
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <img
            src={projectDetail?.imageURL}
            className="object-fit rounded-lg w-2/5"
            style={{ height: "45rem" }}
          />
          <div className="flex flex-col max-w-md">
            <h1 className="font-extrabold text-5xl">
              {projectDetail?.projectName}
            </h1>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row align-center items-center mr-12">
                <Avatar src={projectDetail?.userImage || creator} size={40} />
                <div className="ml-5 flex flex-col">
                  <span className="text-lg text-gray-600">Creator</span>
                  <span className="text-base">{projectDetail?.userName}</span>
                </div>
              </div>
              <div className="flex flex-row align-center items-center">
                <Avatar src={creator} size={40} />
                <div className="ml-5 flex flex-col">
                  <span className="text-lg text-gray-600">Instant price</span>
                  <span className="text-base">3.5 ETH</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border-gray-500 border-2 p-8 mt-8 flex-wrap max-w-md">
              <p className="text-xl mb-0">
                <span className="font-bold mr-2">
                  {projectDetail?.tokenPrice}
                </span>
                <span className="text-gray-1000">FLOW Coin</span>
              </p>
              <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
              <p className="text-gray-1000 text-base">
                {projectDetail?.projectDescription}
              </p>
            </div>
            <div className="flex flex-row justify-between content-center mt-8">
              <div className="flex justify-start flex-col items-center w-24">
                <h1 className="font-extrabold text-2xl mb-0">0</h1>
                <span className="text-xl text-center text-gray-700">
                  Funder
                </span>
              </div>
              <div className="flex justify-start flex-col items-center w-24">
                <h1 className="font-extrabold text-2xl mb-0">{`${projectDetail?.profitSharePercent}%`}</h1>
                <span className="text-xl text-center text-gray-700">
                  Profit of supporter
                </span>
              </div>
            </div>
            <div className="flex flex-col my-10">
              {loggedIn ? (
                <>
                  <Input
                    placeholder="Enter amount of token"
                    className="mr-5 project-detail-input"
                    onChange={(e) => {
                      const reg = /^[0-9\b]+$/;
                      const value = e.target.value;
                      if (value.match(reg) || value === "")
                        setTokenCount(e.target.value);
                    }}
                    value={tokenCount}
                  />
                  <Button
                    className="mb-4 mt-4"
                    type="primary"
                    onClick={onSubmit}
                    size="large"
                    disabled={inputError}
                  >
                    Fund Project
                  </Button>
                </>
              ) : (
                <Button
                  className="mt-4"
                  type="primary"
                  onClick={() => tools?.logIn()}
                  size="large"
                >
                  Sign in to fund project
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;

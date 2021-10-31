import {
  Avatar,
  Button,
  Input,
  notification,
  Progress,
  Table,
  Typography,
  Carousel,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import creator from "../../assets/dappstarter.png";
import {
  fundProject,
  getFunders,
  getRemainingTokenCount,
} from "../../flow/flow";
import { useUserContext } from "../../providers/UserProvider";
import { showError } from "../../utils/tootls";
import Loading from "../Loading";
import SkeletonLoading from "./SkeletonLoading";
import useProjects from "../../hooks/useProjects";

const ProjectDetailCarousel = () => {
  const { user, loggedIn, tools } = useUserContext();
  const [fundedLoading, setFundLoading] = useState(false);
  const [inputError, setInputError] = useState(true);
  const [tokenCount, setTokenCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastThreeProjectsDetail, setLastThreeProjectsDetail] = useState({});
  const { projects } = useProjects();
  const carouselRef = useRef(null);

  const onSubmit = async (project) => {
    console.log(project.projectId);
    if (project.remainningToken === 0) {
      return showError({ message: "Remainning token is not enough!" });
    } else {
      if (inputError) return;
      try {
        setFundLoading(true);
        const fundProjectData = {
          projectId: Number(project.projectId),
          funder: user.addr,
          tokenCount: Number(tokenCount),
        };

        await fundProject(fundProjectData);
        setLastThreeProjectsDetail((prev) => ({
          ...prev,
          [project.projectId]: {
            remainningToken: prev.remainningToken - Number(tokenCount),
          },
        }));
        notification.success({ message: "Funded project success!" });
      } catch (err) {
        console.error(err);
        showError(err);
      } finally {
        setFundLoading(false);
      }
    }
  };

  useEffect(() => {
    const getLastThreeProjects = async () => {
      try {
        setLoading(true);
        lastThreeProjects.forEach(async (item) => {
          const [remainningToken, funders] = await Promise.all([
            getRemainingTokenCount(Number(item.projectId)),
            getFunders(Number(item.projectId)),
          ]);
          const formatedFunders = Object.entries(funders).map(
            ([key, value]) => ({
              address: key,
              tokenCount: value,
            })
          );
          setLastThreeProjectsDetail((prev) => {
            return {
              ...prev,
              [item.projectId]: {
                remainningToken: remainningToken,
                funders: formatedFunders,
              },
            };
          });
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getLastThreeProjects();
  }, [projects]);

  useEffect(() => {
    if (typeof tokenCount !== "number" && Number(tokenCount) <= 0)
      setInputError(true);
    else setInputError(false);
  }, [tokenCount]);

  const lastThreeProjects = projects.slice(
    projects.length - 3,
    projects.length
  );

  const carouselProjects = lastThreeProjects.map((item) => {
    const percent =
      ((item.tokenCount -
        lastThreeProjectsDetail[item.projectId]?.remainningToken) /
        item.tokenCount) *
      100;

    return {
      ...item,
      remainningToken: lastThreeProjectsDetail[item.projectId]?.remainningToken,
      funders: lastThreeProjectsDetail[item.projectId]?.funders,
      percent: percent,
    };
  });
  return (
    <>
      <Loading active={fundedLoading} />
      {loading ? (
        <SkeletonLoading />
      ) : (
        <Carousel ref={carouselRef}>
          {carouselProjects?.map((project) => {
            return (
              <div>
                <div className="flex xs:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row justify-between xs:p-6 sm:p-12 md:p-24 p-48">
                  <img
                    src={project?.imageURL}
                    className="md:object-fit object-cover rounded-lg xs:w-full sm:w-full md:w-full lg:w-full xl:w-1/2"
                    style={{ height: "45rem" }}
                  />
                  <div className="flex flex-col md:w-full lg:max-w-full xl:max-w-md">
                    <h1 className="font-extrabold text-5xl">
                      {project?.projectName}
                    </h1>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row align-center items-center mr-12">
                        <Avatar src={project?.userImage || creator} size={40} />
                        <div className="ml-5 flex flex-col">
                          <span className="text-lg text-gray-600">Creator</span>
                          <span className="text-base">{project?.userName}</span>
                        </div>
                      </div>
                      <div className="flex flex-row align-center items-center">
                        <div className="ml-5 flex flex-col">
                          <span className="text-lg text-gray-600">
                            Number of tokens
                          </span>
                          <span className="text-base">
                            {project.tokenCount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-lg border-gray-500 border-2 p-8 mt-8 flex-wrap">
                      <p className="text-xl mb-0">
                        <span className="font-bold mr-2">
                          {project?.tokenPrice}
                        </span>
                        <span className="text-gray-1000">FLOW Coin</span>
                      </p>
                      <Progress
                        percent={project?.percent}
                        strokeColor="#00C48C"
                        showInfo={false}
                      />
                      <p className="text-gray-1000 text-base">
                        {project?.projectDescription}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between content-center mt-8">
                      <div className="flex justify-start flex-col items-center w-24">
                        <h1 className="font-extrabold text-2xl mb-0">
                          {project?.funders?.length ?? 0}
                        </h1>
                        <span className="text-xl text-center text-gray-700">
                          Funder
                        </span>
                      </div>
                      <div className="flex justify-start flex-col items-center w-40">
                        <h1 className="font-extrabold text-2xl mb-0">{`${project?.profitSharePercent}%`}</h1>
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
                            onClick={() => onSubmit(project)}
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
                    <div>
                      <Button
                        className="flex items-center content-center border-none mr-4"
                        style={{ border: "none" }}
                        icon={
                          <ArrowLeftOutlined style={{ color: "#A8B0C5" }} />
                        }
                        shape="circle"
                        onClick={() => carouselRef.current.prev()}
                      />
                      <Button
                        className="flex items-center content-center"
                        icon={
                          <ArrowRightOutlined style={{ color: "#A8B0C5" }} />
                        }
                        shape="circle"
                        onClick={() => carouselRef.current.next()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default ProjectDetailCarousel;

import { Avatar, Button, Input, notification, Progress, Table, Typography, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import creator from '../../assets/dappstarter.png';
import { fundProject, getFunders, getRemainingTokenCount } from '../../flow/flow';
import useProjects from '../../hooks/useProjects';
import { useUserContext } from '../../providers/UserProvider';
import { showError } from '../../utils/tootls';
import Loading from '../Loading';
import SkeletonLoading from './SkeletonLoading';

const ProjectDetail = ({ project, showFunders = false, showCarousel = false, minProject }) => {
  const [tokenCount, setTokenCount] = useState('');
  const [inputError, setInputError] = useState(true);
  const { user, loggedIn, tools } = useUserContext();
  const { projects } = useProjects();
  const [projectDetail, setProjectDetail] = useState(project);
  const [loading, setLoading] = useState(true);
  const [fundedLoading, setFundLoading] = useState(false);
  const [lastThreeProjectsDetail, setLastThreeProjectsDetail] = useState({});
  const carouselRef = useRef(null);

  const onSubmit = async () => {
    if (projectDetail.remainningToken === 0) {
      return showError({ message: 'Remainning token is not enough!' });
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
        setProjectDetail((currentProject) => {
          const remainningToken =
            currentProject.remainningToken - Number(tokenCount) < 0
              ? 0
              : currentProject.remainningToken - Number(tokenCount);
          if (!remainningToken) {
            return {
              ...currentProject,
              remainningToken,
              status: 'FUNDED',
            };
          }
          return {
            ...currentProject,
            remainningToken,
          };
        });
        notification.success({ message: 'Funded project success!' });
      } catch (err) {
        console.error(err);
        showError(err);
      } finally {
        setFundLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const [remainningToken, funders] = await Promise.all([
          getRemainingTokenCount(Number(project.projectId)),
          getFunders(Number(project.projectId)),
        ]);
        const formatedFunders = Object.entries(funders).map(([key, value]) => ({
          address: key,
          tokenCount: value,
        }));
        setProjectDetail((currentProject) => ({
          ...project,
          remainningToken: remainningToken,
          funders: formatedFunders,
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
    if (typeof tokenCount !== 'number' && Number(tokenCount) <= 0) setInputError(true);
    else setInputError(false);
  }, [tokenCount]);

  const percent = ((projectDetail?.tokenCount - projectDetail?.remainningToken) / projectDetail?.tokenCount) * 100;

  return (
    <>
      <Loading active={fundedLoading} />
      <div className="flex xs:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row justify-between xs:px-6 sm:px-12 md:px-24 px-48">
        {loading ? (
          <SkeletonLoading />
        ) : (
          <>
            <img
              src={projectDetail?.imageURL}
              className="md:object-fit object-cover rounded-lg xs:w-full sm:w-full md:w-full lg:w-full xl:w-1/2 cursor-pointer"
              style={{ height: '45rem' }}
              onClick={() => onClick?.(projectDetail.projectId)}
            />
            <div className="flex flex-col md:w-full lg:max-w-full xl:max-w-xl 2xl:max-w-2xl">
              <h1 className="font-extrabold text-4xl">{projectDetail?.projectName}</h1>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row align-center items-center mr-12">
                  <Avatar src={projectDetail?.userImage || creator} size={40} />
                  <div className="ml-5 flex flex-col">
                    <span className="text-lg text-gray-600">Creator</span>
                    <strong className="text-base">{projectDetail?.userName}</strong>
                  </div>
                </div>
                <div className="flex flex-row align-center items-center">
                  <div className="ml-5 flex flex-col">
                    <span className="text-lg text-gray-600">No. tokens</span>
                    <strong className="text-base">{projectDetail?.tokenCount}</strong>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border-gray-500 border-2 p-8 mt-8 flex-wrap">
                <p className="text-xl mb-0">
                  <span className="text-gray-1000">Token Name:</span>
                  <strong> {projectDetail?.name}</strong>
                </p>
                <p className="text-xl mb-0">
                  <span className="font-bold mr-2">{Number(projectDetail?.tokenPrice ?? 0).toFixed(2)}</span>
                  <span className="text-gray-1000">FLOW Coin</span>
                </p>
                <Progress percent={percent} strokeColor="#00C48C" />
                <p className="text-gray-1000 text-base line-clamp-8">{projectDetail?.projectDescription}</p>
                <Tag color="#070632" className="font-bold" style={{ width: 60 }}>
                  {projectDetail?.projectCategory}
                </Tag>
              </div>
              <div className="flex flex-row justify-between content-center mt-8">
                <div className="flex justify-start flex-col items-center w-24">
                  <h1 className="font-extrabold text-2xl mb-0">{projectDetail?.funders?.length ?? 0}</h1>
                  <span className="text-xl text-center text-gray-700">Funder</span>
                </div>
                <div className="flex justify-start flex-col items-center w-44">
                  <h1 className="font-extrabold text-2xl mb-0">{`${projectDetail?.profitSharePercent}%`}</h1>
                  <span className="text-xl text-center text-gray-700">Profit for supporter</span>
                </div>
              </div>
              <div className="flex flex-col my-10">
                {(() => {
                  if (!loggedIn) {
                    return (
                      <Button className="mt-4" type="primary" onClick={() => tools?.logIn()} size="large">
                        Sign in to fund project
                      </Button>
                    );
                  }
                  if (minProject) {
                    return (
                      <Button className="mt-4" type="primary" size="large" onClick={() => minProject(projectDetail)}>
                        Mint
                      </Button>
                    );
                  }
                  if (projectDetail?.status === 'FUNDED') {
                    return (
                      <div
                        className="text-center p-4 rounded-md text-xl"
                        style={{
                          color: '#389e0d',
                          background: '#f6ffed',
                          border: '1px solid #b7eb8f',
                        }}
                      >
                        This project is fully funded!
                      </div>
                    );
                  }
                  return (
                    <>
                      <Input
                        placeholder="E.g 2 (amount of token funded)"
                        className="mr-5 project-detail-input"
                        onChange={(e) => {
                          const reg = /^[0-9\b]+$/;
                          const value = e.target.value;
                          if (value.match(reg) || value === '') setTokenCount(e.target.value);
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
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </div>
      {showFunders && (
        <div className="xs:p-6 sm:p-12 md:p-24 px-48 py-16 mb-6 mt-2">
          <Typography className="text-4xl font-extrabold">List of funder</Typography>
          <Table
            className="mt-8"
            columns={[
              {
                key: 'address',
                title: 'Funder',
                dataIndex: 'address',
                render: (address) => {
                  return (
                    <div className="flex items-center">
                      <Avatar src="https://i.pravatar.cc" />
                      <strong className="ml-2">{address}</strong>
                    </div>
                  );
                },
              },
              {
                key: 'tokenCount',
                title: 'Number of Token',
                dataIndex: 'tokenCount',
              },
            ]}
            dataSource={projectDetail?.funders ?? []}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;

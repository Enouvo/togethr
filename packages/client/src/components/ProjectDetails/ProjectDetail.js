import { Avatar, Button, Input, notification, Progress, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import creator from '../../assets/dappstarter.png';
import { fundProject, getFunders, getRemainingTokenCount } from '../../flow/flow';
import { useUserContext } from '../../providers/UserProvider';
import { showError } from '../../utils/tootls';
import Loading from '../Loading';
import SkeletonLoading from './SkeletonLoading';

const ProjectDetail = ({ project, showFunders = false }) => {
  const [tokenCount, setTokenCount] = useState('');
  const [inputError, setInputError] = useState(true);
  const { user, loggedIn, tools } = useUserContext();
  const [projectDetail, setProjectDetail] = useState(project);
  const [loading, setLoading] = useState(true);
  const [fundedLoading, setFundLoading] = useState(false);

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
        setProjectDetail((currentProject) => ({
          ...currentProject,
          remainningToken: currentProject.remainningToken - Number(tokenCount),
        }));
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

  const percent = ((projectDetail.tokenCount - projectDetail.remainningToken) / projectDetail.tokenCount) * 100;

  return (
    <>
      <Loading active={fundedLoading} />
      <div className="flex xs:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row justify-between xs:p-6 sm:p-12 md:p-24 p-48">
        {loading ? (
          <SkeletonLoading />
        ) : (
          <>
            <img
              src={projectDetail?.imageURL}
              className="md:object-fit object-cover rounded-lg xs:w-full sm:w-full md:w-full lg:w-full xl:w-1/2"
              style={{ height: '45rem' }}
            />
            <div className="flex flex-col md:w-full lg:max-w-full xl:max-w-md">
              <h1 className="font-extrabold text-5xl">{projectDetail?.projectName}</h1>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row align-center items-center mr-12">
                  <Avatar src={projectDetail?.userImage || creator} size={40} />
                  <div className="ml-5 flex flex-col">
                    <span className="text-lg text-gray-600">Creator</span>
                    <span className="text-base">{projectDetail?.userName}</span>
                  </div>
                </div>
                <div className="flex flex-row align-center items-center">
                  <div className="ml-5 flex flex-col">
                    <span className="text-lg text-gray-600">Number of tokens</span>
                    <span className="text-base">{projectDetail.tokenCount}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border-gray-500 border-2 p-8 mt-8 flex-wrap">
                <p className="text-xl mb-0">
                  <span className="font-bold mr-2">{projectDetail?.tokenPrice}</span>
                  <span className="text-gray-1000">FLOW Coin</span>
                </p>
                <Progress percent={percent} strokeColor="#00C48C" showInfo={false} />
                <p className="text-gray-1000 text-base">{projectDetail?.projectDescription}</p>
              </div>
              <div className="flex flex-row justify-between content-center mt-8">
                <div className="flex justify-start flex-col items-center w-24">
                  <h1 className="font-extrabold text-2xl mb-0">{projectDetail?.funders?.length ?? 0}</h1>
                  <span className="text-xl text-center text-gray-700">Funder</span>
                </div>
                <div className="flex justify-start flex-col items-center w-40">
                  <h1 className="font-extrabold text-2xl mb-0">{`${projectDetail?.profitSharePercent}%`}</h1>
                  <span className="text-xl text-center text-gray-700">Profit of supporter</span>
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
                        if (value.match(reg) || value === '') setTokenCount(e.target.value);
                      }}
                      value={tokenCount}
                    />
                    <Button className="mb-4 mt-4" type="primary" onClick={onSubmit} size="large" disabled={inputError}>
                      Fund Project
                    </Button>
                  </>
                ) : (
                  <Button className="mt-4" type="primary" onClick={() => tools?.logIn()} size="large">
                    Sign in to fund project
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {showFunders && (
        <div className="px-48 my-6">
          <Typography className="text-4xl font-extrabold">List of funder</Typography>
          <Table
            className="mt-8"
            columns={[
              {
                key: 'address',
                title: 'Address',
                dataIndex: 'address',
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

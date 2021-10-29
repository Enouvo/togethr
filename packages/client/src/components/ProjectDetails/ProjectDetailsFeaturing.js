import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Progress, Button, Input, Typography } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import featuring from '../../assets/project_detail_featuring.png';
import creator from '../../assets/dappstarter.png';
import { fundProject } from '../../flow/flow';
import { useUserContext } from '../../providers/UserProvider';

const ProjectDetailsFeaturing = () => {
  const [tokenCount, setTokenCount] = useState('');
  const [inputError, setInputError] = useState(true);
  const { user } = useUserContext();
  const { id: projectId } = useParams();

  const onSubmit = async () => {
    if (!inputError)
      try {
        const fundProjectData = {
          projectId: Number(projectId),
          funder: user.addr,
          tokenCount: Number(tokenCount),
        };
        console.log(fundProjectData);
        const res = await fundProject(fundProjectData);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
  };

  useEffect(() => {
    if (typeof tokenCount !== 'number' && Number(tokenCount) <= 0) setInputError(true);
    else setInputError(false);
  }, [tokenCount]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-around p-32">
        <img src={featuring} className="object-fit rounded-lg w-2/5" style={{ height: '45rem' }} />
        <div className="flex flex-col max-w-md">
          <h1 className="font-extrabold text-5xl">SuperBase Pro: Fastest Recharge IoT Power Station</h1>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row align-center items-center mr-12">
              <Avatar src={creator} size={40} />
              <div className="ml-5 flex flex-col">
                <span className="text-lg text-gray-600">Creator</span>
                <span className="text-base">Enrico Cole</span>
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
              <span className="font-extrabold">1000</span> FUSD
            </p>
            <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
            <p className="text-gray-700 text-lg">
              Charge to 80% in 1 hour via AC, EV or Solar/2,096Wh & 2,000W Output/Built-in 4G IoT &App/14 Outputs
            </p>
          </div>
          <div className="flex flex-row justify-between content-center mt-8">
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">19</h1>
              <span className="text-xl text-center text-gray-700">Days left</span>
            </div>
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">24</h1>
              <span className="text-xl text-center text-gray-700">Backer</span>
            </div>
            <div className="flex justify-start flex-col items-center w-24">
              <h1 className="font-extrabold text-2xl mb-0">10%</h1>
              <span className="text-xl text-center text-gray-700">Profit of supporter</span>
            </div>
          </div>
          <div className="flex flex-col my-10">
            <Input
              placeholder="Enter"
              className={`mr-5 project-detail-input ${inputError && 'border-red-700'}`}
              onChange={(e) => setTokenCount(e.target.value)}
              type="number"
              value={tokenCount}
            />
            {inputError && (
              <Typography.Text type="danger" className="font-bold">
                Do not enter the number below zero
              </Typography.Text>
            )}
            <Button className="mb-4 mt-4" type="primary" onClick={onSubmit} size="large" disabled={inputError}>
              Fund Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsFeaturing;

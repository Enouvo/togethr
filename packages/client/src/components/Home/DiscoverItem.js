import React from 'react';
import { Progress } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const DiscoverItem = ({ project }) => {
  const history = useHistory();

  const redirectToProjectDetail = () => {
    history.push(`/projects/${project.projectId}`);
  };

  return (
    <div className="justify-center" onClick={redirectToProjectDetail}>
      <img src={project?.imageURL} className="m-0 object-cover w-full h-48" />
      <h2 className="text-xl font-bold">{project?.projectName}</h2>
      <div>
        <span className="text-lg font-bold">{20 + ' '}</span>
        <span className="text-lg text-gray-600">FLOW</span>
      </div>
      <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
    </div>
  );
};

export default DiscoverItem;

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
      <div className="relative discover-image">
        <img src={project?.imageURL} className="m-0 object-cover w-full h-64 rounded-lg" style={{ height: '20rem' }} />
        <span className="discover-category-span border-gray-700 border-1 px-2 py-1 text-white bg-purple-1000 font-bold rounded-md">
          {project?.projectCategory}
        </span>
      </div>
      <h2 className="text-xl font-bold">{project?.projectName}</h2>
      <div>
        <span className="text-lg font-bold">{project?.tokenPrice + ' '} </span>
        <span className="text-lg text-gray-600">FLOW</span>
      </div>
      <Progress percent={50} strokeColor="#00C48C" showInfo={false} />
    </div>
  );
};

export default DiscoverItem;
